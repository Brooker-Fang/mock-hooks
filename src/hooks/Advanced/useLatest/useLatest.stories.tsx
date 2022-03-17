import { storiesOf } from '@storybook/react';
import { useState, useEffect } from 'react';
import useLatest from '.';

const useLatestStory = () => {
  const [count, setCount] = useState(0);

  const latestCountRef = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(latestCountRef.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>count: {count}</p>
    </>
  );
};
storiesOf('useLatest', module).add('useLatest', useLatestStory);
