import type { DependencyList, EffectCallback, useEffect, useLayoutEffect } from 'react';
import react, { useRef } from 'react';
import { depsAreSame } from '.';
import useUnmount from '../hooks/LifeCycle/useUnmount';
import type { BasicTarget } from './domTarget';
import { getTargetElement } from './domTarget';

// 创建一个useEffectWithTarget，允许传入第三个参数 dom 或者 ref 或者返回dom的函数，监听 第三个参数 变化时，重新执行 回调
const createEffectWithTarget = (useEffectType: typeof useEffect | typeof useLayoutEffect) => {
  /**
   *
   * @param effect
   * @param deps
   * @param target target should compare ref.current vs ref.current, dom vs dom, ()=>dom vs ()=>dom
   */
  const useEffectWithTarget = (effect: EffectCallback, deps: DependencyList, target: BasicTarget<any> | BasicTarget<any>[]) => {
    const hasInitRef = useRef(false);

    const lastElementRef = useRef<(Element | null)[]>([]);
    const lastDepsRef = useRef<DependencyList>([]);

    const unLoadRef = useRef<any>();

    // 没有传入 第二个参数，所以每次都会执行
    useEffectType(() => {
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map((item) => getTargetElement(item));

      /* 
        初始化时进行赋值
      */
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;
        lastDepsRef.current = deps;

        unLoadRef.current = effect();
        return;
      }

      /* 
        当传入的target发生变化时，重新执行回调
      */
      if (els.length !== lastElementRef.current.length || !depsAreSame(els, lastElementRef.current) || !depsAreSame(deps, lastDepsRef.current)) {
        unLoadRef.current?.();

        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
      }
    });

    // 卸载时
    useUnmount(() => {
      // 卸载时执行 useEffect || useLayoutEffect 返回的函数
      unLoadRef.current?.();
      // 解决 react-refresh 问题 https://ahooks.js.org/zh-CN/guide/blog/hmr/
      hasInitRef.current = false;
    });
  };

  return useEffectWithTarget;
};

export const useEffectWithTarget = createEffectWithTarget(react.useEffect);

export default createEffectWithTarget;
