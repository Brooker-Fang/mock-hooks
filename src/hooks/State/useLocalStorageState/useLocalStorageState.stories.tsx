import { storiesOf } from '@storybook/react';
import useLocalStorageState from '.';

const useLocalStorageStateStory = () => {
  return (
    <div>
      <p>将状态存储在 localStorage 中的 Hook 。</p>
      <h3>使用</h3>
      {`
        interface Options<T> {
          defaultValue?: T | (() => T);
          serializer?: (value: T) => string;
          deserializer?: (value: string) => T;
        }
        
        const [state, setState] = useLocalStorageState<T>(
          key: string,
          options: Options<T>
        ): [T?, (value?: T | ((previousState: T) => T)) => void]
        `}
      <h3>示例</h3>
      <div>{useLocalStorageStateExample()}</div>
    </div>
  );
};
const useLocalStorageStateExample = () => {
  const [message, setMessage] = useLocalStorageState('use-local-storage-state-demo3', {
    defaultValue: 'Hello~',
    serializer: (v) => v,
    deserializer: (v) => v,
  });

  return (
    <>
      <input value={message || ''} placeholder="Please enter some words..." onChange={(e) => setMessage(e.target.value)} />
      <button style={{ margin: '0 8px' }} type="button" onClick={() => setMessage('Hello~')}>
        Reset
      </button>
      <button type="button" onClick={() => setMessage()}>
        Clear
      </button>
    </>
  );
};
storiesOf('useLocalStorageState', module).add('useLocalStorageState', useLocalStorageStateStory);
