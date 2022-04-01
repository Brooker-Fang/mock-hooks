import { DependencyList, EffectCallback, useEffect, useState } from 'react';
import useUnmount from '../../LifeCycle/useUnmount';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';
export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

function useDebounceEffect(effect: EffectCallback, deps?: DependencyList, options?: DebounceOptions) {
  const [flag, setFlag] = useState({});
  const { run, cancel } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUnmount(cancel);
  useUpdateEffect(effect, [flag]);
}

export default useDebounceEffect;
