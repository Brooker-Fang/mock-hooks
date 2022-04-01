import { useCallback, useRef } from 'react';

function useLockFn<P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>) {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return;
      lockRef.current = true;
      try {
        const ret = await fn(...args);
        lockRef.current = false;
        return ret;
      } catch (error) {
        lockRef.current = false;
        throw error;
      }
    },
    [fn]
  );
}

export default useLockFn;