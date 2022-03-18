import { storiesOf } from '@storybook/react';
import { useEffect, useState } from 'react';
import useSafeState from '.';

const useSafeStateStory = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <h3>
        用法与 <code>React.useState</code> 完全一样，但是在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏。
      </h3>
      <h3>使用</h3>
      <p>
        <code>const [state, setState] = useSafeState(initialState)</code>
      </p>
      <h3>示例</h3>
      <p>
        <div>
          <button onClick={() => setVisible(false)}>Unmount</button>
          {visible && <UseSafeStateExample />}
        </div>
      </p>
    </div>
  );
};
const UseSafeStateExample = () => {
  const [value, setValue] = useSafeState<string>();

  useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server');
    }, 5000);
  }, []);

  const text = value || 'Loading...';

  return <div>{text}</div>;
};

storiesOf('useSafeState', module).add('useSafeState', useSafeStateStory);
