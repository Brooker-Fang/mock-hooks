import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import useAsyncEffect from '.';

const useAsyncEffectStory = () => {
  return (
    <div>
      <h3>useEffect 支持异步函数。</h3>
      <h3>使用</h3>
      <div>
        {`
          function useAsyncEffect(
            effect: () => AsyncGenerator | Promise,
            deps: DependencyList
          );
          `}
        <h3>基本使用</h3>
        <UseAsyncEffectExample></UseAsyncEffectExample>
      </div>
    </div>
  );
};
function mockCheck(): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}

const UseAsyncEffectExample = () => {
  const [pass, setPass] = useState<boolean>();

  useAsyncEffect(async () => {
    setPass(await mockCheck());
  }, []);

  return (
    <div>
      {pass === null && 'Checking...'}
      {pass === true && 'Check passed.'}
    </div>
  );
};

function mockCheckVal(val: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val.length > 0);
    }, 1000);
  });
}

const UseAsyncEffectInterrupt = () => {
  const [value, setValue] = useState('');
  const [pass, setPass] = useState<boolean>();

  useAsyncEffect(
    async function* () {
      setPass(undefined);
      const result = await mockCheckVal(value);
      yield; // Check whether the effect is still valid, if it is has been cleaned up, stop at here.
      setPass(result);
    },
    [value]
  );

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <p>
        {pass === null && 'Checking...'}
        {pass === false && 'Check failed.'}
        {pass === true && 'Check passed.'}
      </p>
    </div>
  );
};
storiesOf('useAsyncEffect', module).add('useAsyncEffect', useAsyncEffectStory).add('中断执行', UseAsyncEffectInterrupt);
