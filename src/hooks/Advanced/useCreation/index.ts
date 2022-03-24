import { DependencyList, useRef } from 'react';
import { depsAreSame } from '../../../utils';

/* 
  useCreation 是 useMemo 或 useRef 的替代品。
    因为 useMemo 不能保证被 memo 的值一定不会被重计算，而 useCreation 可以保证这一点。以下为 React 官方文档中的介绍：
      You may rely on useMemo as a performance optimization, not as a semantic guarantee. 
      In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, 
      e.g. to free memory for offscreen components. Write your code so that it still works without useMemo — and then add it to optimize performance.
      https://coder-solution-ru.com/solution-ru-blog/877824
    大意：例如，如果我们添加了一个 API，可以让您将组件标记为“不可见”（例如隐藏选项卡）而不会丢失其状态，那么保留降低内存开销的能力可能是有意义的——
      例如，可能存在一种模式，如果隐藏的选项卡被隐藏超过几分钟，您就有办法释放仅由 memoization 占用的额外内存。对于有很多事情的高度交互的应用程序，这可能会有所帮助。
    而相比于 useRef，你可以使用 useCreation 创建一些常量，这些常量和 useRef 创建出来的 ref 有很多使用场景上的相似，但对于复杂常量的创建，useRef 却容易出现潜在的性能隐患。
*/
function useCreation<T>(factory: () => T, deps: DependencyList) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj as T;
}

export default useCreation;
