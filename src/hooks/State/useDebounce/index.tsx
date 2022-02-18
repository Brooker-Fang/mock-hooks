import { useEffect, useRef, useState } from "react";
interface Options {
  wait: number
}
const useDebounce = (value: any, options: Options) => {
  const { wait } = options
  const [debounced, setDebounced] = useState(value)
  const timer = useRef<any>()
  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebounced(value)
    }, wait)
    return () => {
      clearTimeout(timer.current)
    }
  }, [value])
  return debounced
}
const useDebounceTest = () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};