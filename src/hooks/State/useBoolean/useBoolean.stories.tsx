import { storiesOf } from '@storybook/react';
import useBoolean from '.';

const useBooleanStroy = () => {
  return (
    <div>
      <p>优雅的管理 boolean 状态的 Hook。</p>
      <h3>使用</h3>
      <code>
        {`
          const [ state, { toggle, set, setTrue, setFalse }] = useBoolean(
            defaultValue?: boolean,
          );
        `}
      </code>
      <h3>示例</h3>
      <UseBooleanExample></UseBooleanExample>
    </div>
  );
};
const UseBooleanExample = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setFalse} style={{ margin: '0 16px' }}>
          Set false
        </button>
        <button type="button" onClick={setTrue}>
          Set true
        </button>
      </p>
    </div>
  );
};
storiesOf('useBoolean', module).add('useBoolean', useBooleanStroy);
