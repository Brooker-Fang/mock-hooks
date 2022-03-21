import { storiesOf } from '@storybook/react';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import useClickAway from '.';

const useClickAwayStory = () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  useClickAway(() => {
    setCounter((s) => s + 1);
  }, ref);
  return (
    <div>
      <h3>监听目标元素外的点击事件。</h3>
      <h3>使用</h3>
      <p>
        {`
        useClickAway<T extends Event = Event>(
          onClickAway: (event: T) => void,
          target: Target | Target[],
          eventName?: string | string[]
        );
        `}
      </p>
      <h3>示例</h3>
      <div>
        <Button ref={ref}>box</Button>
        <p>counter: {counter}</p>
      </div>
    </div>
  );
};
const useClickAwayMulti = () => {
  const [counter, setCounter] = useState(0);
  const ref1 = useRef<HTMLElement | null>(null);
  const ref2 = useRef<HTMLElement | null>(null);
  useClickAway(() => {
    setCounter((s) => s + 1);
  }, [ref1, ref2]);

  return (
    <div>
      <Button ref={ref1}>box1</Button>
      <Button ref={ref2}>box2</Button>
      <p>counter: {counter} </p>
    </div>
  );
};
storiesOf('useClickAway', module)
  .add('useClickAway 基础用法', useClickAwayStory)
  .add('useClickAway 多个DOM对象', useClickAwayMulti)
  .add('useClickAway 基础用法', useClickAwayStory);
