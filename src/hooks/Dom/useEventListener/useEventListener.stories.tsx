import { storiesOf } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
// import { useEventListener } from 'ahooks';
import useEventListener from '.';
import { Button } from 'antd';

const useEventListenerStory = () => {
  return (
    <div>
      <h3>使用 addEventListener 的hook</h3>
      <h3>使用</h3>
      <p>
        {`useEventListener(
            eventName: string,
            handler: (ev: Event) => void,
            options?: Options,
          )`}
      </p>
      <h3>示例</h3>
      <UseEventListenerExample></UseEventListenerExample>
    </div>
  );
};
const UseEventListenerExample = () => {
  const [value, setValue] = useState(0);
  const [keyDownValue, setKeyDownValue] = useState<string>();
  const ref = useRef<HTMLElement | null>(null);
  useEventListener(
    'click',
    () => {
      setValue(value + 1);
    },
    { target: ref }
  );
  useEventListener('keydown', (ev) => {
    setKeyDownValue(ev.code);
  });

  return (
    <div>
      <Button ref={ref}>You click {value} times</Button>
      <Button>Your press key is {keyDownValue}</Button>
    </div>
  );
};
// 看 createEffectWithTarget 注释
const UseEventListenerDynamicTarget = () => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const ref2 = useRef<HTMLElement | null>(null);
  let targetOptions = useRef({ target: ref });
  useEventListener(
    'click',
    () => {
      // setValue(value + 1);
      console.log('click');
      targetOptions.current = { target: ref2 };
      console.log(targetOptions.current);
    },
    targetOptions.current
  );

  return (
    <div>
      <Button ref={ref}>You click {value} times</Button>
      <Button ref={ref2}>ref2</Button>
    </div>
  );
};
storiesOf('useEventListener', module).add('useEventListener', useEventListenerStory).add('测试动态target变换case', UseEventListenerDynamicTarget);
