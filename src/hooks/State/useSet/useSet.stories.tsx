import { storiesOf } from '@storybook/react';
import useSet from '.';

const useSetStory = () => {
  return (
    <div>
      <p>管理 Set 类型状态的 Hook。</p>
      <h3>使用</h3>
      <p>
        {`
        const [
          set,
          {
            add,
            remove,
            reset
          }
        ] = useSet(initialValue?: Iterable<K>);
        `}
      </p>
      <h3>示例</h3>
      <p>
        <UseSetExample></UseSetExample>
      </p>
    </div>
  );
};
const UseSetExample = () => {
  const [set, { add, remove, reset }] = useSet(['Hello']);

  return (
    <div>
      <button type="button" onClick={() => add(String(Date.now()))}>
        Add Timestamp
      </button>
      <button type="button" onClick={() => remove('Hello')} disabled={!set.has('Hello')} style={{ margin: '0 8px' }}>
        Remove Hello
      </button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(set), null, 2)}</pre>
      </div>
    </div>
  );
};
storiesOf('useSet', module).add('useSet', useSetStory);
