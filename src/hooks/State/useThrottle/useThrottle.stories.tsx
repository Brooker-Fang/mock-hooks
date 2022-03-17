import { storiesOf } from '@storybook/react';
import { Input } from 'antd';
import { useState } from 'react';
import useThrottle from '.';

const useThrottleStory = () => {
  const [wait, setWait] = useState<string>('500');
  const [value, setValue] = useState<string>();
  const throttledValue = useThrottle(value, { wait: parseInt(wait) });

  return (
    <div>
      <p>用来处理值的节流 的 Hook。</p>
      <h3>使用</h3>
      {`
      const throttledValue = useThrottle(
        value: any,
        options?: Options
      );
      `}
      <h3>
        示例： ThrottledValue 只会在输入结束 <Input style={{ width: '100px' }} value={wait} onChange={(e) => setWait(e.target.value)} />
        ms 后变化。
      </h3>
      <div>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Typed value" style={{ width: 280 }} />
        <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
      </div>
    </div>
  );
};
storiesOf('useThrottle', module).add('useThrottle', useThrottleStory);
