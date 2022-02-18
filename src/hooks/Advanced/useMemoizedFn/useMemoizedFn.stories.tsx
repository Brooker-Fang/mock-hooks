import { storiesOf } from '@storybook/react';
import { memo, useCallback, useRef, useState } from 'react';
import useMemoizedFn from '.';

const useMemoizedFnTest = () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    alert(`Current count is ${count}`);
  }, [count]);

  const memoizedFn = useMemoizedFn(() => {
    alert(`Current count is ${count}`);
  });

  return (
    <>
      <div>
        <p>useCallback 使用时，在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化</p>
        <p>使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。</p>
      </div>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Add Count
      </button>
      <div style={{ marginTop: 32 }}>
        <h3>useCallback function:</h3>
        {/* use callback function, ExpensiveTree component will re-render on state change */}
        <ExpensiveTree showCount={callbackFn} />
      </div>

      <div style={{ marginTop: 32 }}>
        <h3>useMemoizedFn function:</h3>
        {/* use memoized function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={memoizedFn} />
      </div>
    </>
  );
};

// some expensive component with React.memo
const ExpensiveTree = memo<{ [key: string]: any }>(({ showCount }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <p>渲染 次数: {renderCountRef.current}</p>
      <button type="button" onClick={showCount}>
        showParentCount
      </button>
    </div>
  );
});
storiesOf('useMemoized', module).add('use', useMemoizedFnTest);
