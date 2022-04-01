import { debounce } from 'lodash';
import { useMemo } from 'react';
import useLatest from '../../Advanced/useLatest';
import useUnmount from '../../LifeCycle/useUnmount';
import { DebounceOptions } from '../useDebounceEffect';

type noop = (...args: any) => any;

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  const fnRef = useLatest(fn);
  const wait = options?.wait ?? 1000;

  const debounced = useMemo(() => {
    return debounce(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...args);
      },
      wait,
      options
    );
  }, []);
  useUnmount(() => {
    debounced.cancel();
  });
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}
export default useDebounceFn;
