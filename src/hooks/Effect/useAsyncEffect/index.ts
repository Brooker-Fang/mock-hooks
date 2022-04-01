import { DependencyList, useEffect } from 'react';

function useAsyncEffect(effect: () => AsyncGenerator<void, void, void> | Promise<void>, deps: DependencyList) {
  function isGenerator(val: AsyncGenerator<void, void, void> | Promise<void>): val is AsyncGenerator<void, void, void> {
    return typeof (val as any)[Symbol.asyncIterator] === 'function';
  }
  useEffect(() => {
    const e = effect();
    let canceled = false;
    async function execute() {
      if (isGenerator(e)) {
        while (true) {
          const result = await e.next();
          if (canceled || result.done) {
            break;
          }
        }
      } else {
        await e;
      }
    }
    execute();
    return () => {
      canceled = true;
    };
  }, deps);
}
export default useAsyncEffect;
