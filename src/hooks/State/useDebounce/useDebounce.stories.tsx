import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import useDebounce from '.';
const useDebounceStory = () => {
  return (
    <div>
      <p>用来处理防抖函数的 Hook。</p>
      <h3>使用</h3>
      {`
      const {
        run,
        cancel,
        flush
      } = useDebounceFn(
        fn: (...args: any[]) => any,
        options?: Options
      );
      `}
      <h3>使用</h3>
      {useDebounceTest()}
    </div>
  );
};
const useDebounceTest = () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Typed value" style={{ width: 280 }} />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};
storiesOf('useDebounce', module).add('useDebounce', useDebounceStory);
