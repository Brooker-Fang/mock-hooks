import { useState } from 'react';
import useMemoizedFn from '../../Advanced/useMemoizedFn';

function useSet<T>(initialValue?: Iterable<T>) {
  const getInitValue = () => {
    return initialValue ? new Set<T>() : new Set<T>(initialValue);
  };
  const [set, setSet] = useState<Set<T>>(() => getInitValue());

  const add = (key: T) => {
    if (set.has(key)) {
      return;
    }
    setSet((prev) => {
      const temp = new Set<T>(prev);
      temp.add(key);
      return temp;
    });
  };
  const remove = (key: T) => {
    if (!set.has(key)) {
      return;
    }
    setSet((prev) => {
      const temp = new Set<T>(prev);
      temp.delete(key);
      return temp;
    });
  };
  const reset = () => setSet(getInitValue());
  return [
    set,
    {
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
    },
  ] as const;
}
export default useSet;
