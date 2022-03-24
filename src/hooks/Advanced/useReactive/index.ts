import { useRef } from 'react';
import { isObject } from '../../../utils';
import useUpdate from '../../Effect/useUpdate';
import useCreation from '../useCreation';

// 原对象：代理过的对象
const proxyMap = new WeakMap();
// 代理过的对象：原对象
const rawMap = new WeakMap();

function observe<T extends Record<string, any>>(initialVal: T, cb: () => void): T {
  const existingProxy = proxyMap.get(initialVal);

  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }
  // 防止代理已经代理过的对象
  if (rawMap.has(initialVal)) {
    return initialVal;
  }
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return isObject(res) ? observe(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      const res = Reflect.set(target, key, val);
      cb();
      return res;
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key);
      cb();
      return res;
    },
  });
  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);
  return proxy;
}

function useReactive<S extends Record<string, any>>(initialVal: S): S {
  const update = useUpdate();
  const stateRef = useRef<S>(initialVal);

  const state = useCreation(() => {
    return observe(stateRef.current, () => {
      update();
    });
  }, []);
  return state;
}
export default useReactive;
