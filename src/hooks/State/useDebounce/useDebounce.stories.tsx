import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import useDebounce from '.';
import { Input } from 'antd';
const useDebounceStory = () => {
  const [wait, setWait] = useState<string>('500');
  return (
    <div>
      <p>用来处理值的防抖的 Hook。</p>
      <h3>使用</h3>
      {`
      const debouncedValue = useDebounce(
        value: any,
        options?: Options
      );
      `}
      <h3>
        示例： DebouncedValue 只会在输入结束 <Input style={{ width: '100px' }} value={wait} onChange={(e) => setWait(e.target.value)} />
        ms 后变化。
      </h3>
      {useDebounceTest(parseInt(wait))}
    </div>
  );
};
const useDebounceTest = (wait = 500) => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: wait });

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Typed value" style={{ width: 280 }} />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};
storiesOf('useDebounce', module).add('useDebounce', useDebounceStory);
