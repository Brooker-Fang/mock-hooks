import { useCallback, useState } from 'react';
import useLatest from '../../Advanced/useLatest';
interface EventTarget<U> {
  target: {
    value: U;
  };
}
type Options<T, U> = {
  initialValue?: T;
  transformer?: (value: U) => T;
};
// 常见表单控件(通过 e.target.value 获取表单值) 的 onChange 跟 value 逻辑封装，支持自定义值转换和重置功能。
function useEventTarget<T, U = T>(options?: Options<T, U>) {
  const { initialValue, transformer } = options || {};
  const [value, setValue] = useState(initialValue);

  const transformerRef = useLatest(transformer);

  const reset = useCallback((e: EventTarget<U>) => {
    setValue(initialValue);
  }, []);

  const onChange = useCallback((e: EventTarget<U>) => {
    const _value = e.target.value;
    if (typeof transformerRef.current === 'function') {
      return setValue(transformerRef.current(_value));
    }
    return setValue(_value as unknown as T);
  }, []);
  return [
    value,
    {
      onChange,
      reset,
    },
  ];
}

export default useEventTarget;
