import { useMemo } from 'react';
import useLatest from '../../Advanced/useLatest';
import { throttle } from 'lodash';
import useUnmount from '../../LifeCycle/useUnmount';
import { ThrottleOptions } from '../../State/useThrottle';
type noop = (...args: any) => any;

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  const fnRef = useLatest(fn);
  const wait = options?.wait ?? 1000;
  const throttled = useMemo(() => {
    return throttle<T>(
      ((...args: any[]) => {
        return fnRef.current(...args);
      }) as T,
      wait,
      options
    );
  }, []);
  useUnmount(() => {
    throttled.cancel();
  });
  return {
    run: throttled as unknown as T,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;
