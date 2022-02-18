import { useEffect, useRef, useState } from 'react';
interface Options {
  wait: number;
}
const useDebounce = (value: any, options: Options) => {
  const { wait } = options;
  const [debounced, setDebounced] = useState(value);
  const timer = useRef<any>();
  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebounced(value);
    }, wait);
    return () => {
      clearTimeout(timer.current);
    };
  }, [value]);
  return debounced;
};
export default useDebounce;
