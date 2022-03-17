import { storiesOf } from '@storybook/react';
import useMap from '.';

const useMapStory = () => {
  return (
    <div>
      <p>管理 Map 类型状态的 Hook。</p>
      <h3>使用</h3>
      <p>
        {`const [
          map,
          {
            set, 
            setAll, 
            remove, 
            reset, 
            get
          }
        ] = useMap(initialValue?: Iterable<[any, any]>);
        `}
      </p>
      <h3>示例</h3>
      <p>
        <UseMapExample></UseMapExample>
      </p>
    </div>
  );
};
const UseMapExample = () => {
  const [map, { set, setAll, remove, reset, get }] = useMap<string | number, string>([
    ['msg', 'hello world'],
    [123, 'number type'],
  ] as const);

  return (
    <div>
      <button type="button" onClick={() => set(String(Date.now()), new Date().toJSON())}>
        Add
      </button>
      <button type="button" onClick={() => setAll([['text', 'this is a new Map']] as const)} style={{ margin: '0 8px' }}>
        Set new Map
      </button>
      <button type="button" onClick={() => remove('msg')} disabled={!get('msg')}>
        Remove 'msg'
      </button>
      <button type="button" onClick={() => reset()} style={{ margin: '0 8px' }}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
    </div>
  );
};
storiesOf('useMap', module).add('useMap', useMapStory);
