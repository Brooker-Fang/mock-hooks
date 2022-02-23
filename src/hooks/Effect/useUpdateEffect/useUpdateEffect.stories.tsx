import { storiesOf } from '@storybook/react';
import { useEffect, useState } from 'react';
import useUpdateEffect from '.';

const useUpdateEffectStory = () => {
  return (
    <div>
      <p>useUpdateEffect 用法等同于 useEffect，但是会忽略首次执行，只在依赖更新时执行。</p>
      <h3>使用</h3>
      {`
      useUpdateEffect(
        effect: React.EffectCallback,
        deps?: React.DependencyList,
      )
      `}
      <h3>示例</h3>
      <div>{useUpdateEffectExample()}</div>
    </div>
  );
};
const useUpdateEffectExample = () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useEffect(() => {
    setEffectCount((c) => c + 1);
  }, [count]);

  useUpdateEffect(() => {
    setUpdateEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
      <p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
storiesOf('useUpdateEffect', module).add('useUpdateEffect', useUpdateEffectStory);
