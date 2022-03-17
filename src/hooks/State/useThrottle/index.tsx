import { useEffect, useState } from 'react';
import useThrottleFn from '../../Effect/useThrottleFn';

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}
function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);
  useEffect(() => {
    run();
  }, []);
  return throttled;
}
export default useThrottle;
