import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import useThrottle from '.';

const useThrottleStory = () => {
  const [value, setValue] = useState<string>();
  const throttledValue = useThrottle(value, { wait: 500 });

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Typed value" style={{ width: 280 }} />
      <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
    </div>
  );
};
storiesOf('useThrottle', module).add('useThrottle', useThrottleStory);
