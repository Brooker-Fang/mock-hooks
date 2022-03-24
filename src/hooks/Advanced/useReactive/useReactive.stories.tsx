import { storiesOf } from '@storybook/react';
import { useEffect, useState } from 'react';
import useReactive from '.';
import { Button, Input } from 'antd';
const useReactiveStory = () => {
  return (
    <div>
      <h3>提供一种数据响应式的操作体验，定义数据状态不需要写useState，直接修改属性即可刷新视图。</h3>
      <h3>使用</h3>
      <p>
        <code>
          {`
            const state = useReactive(initialState: Record<string, any>);
            `}
        </code>
      </p>
      <h3>示例</h3>
      <UseReactiveExample></UseReactiveExample>
      <h3>
        注意：useReactive 产生可操作的代理对象一直都是同一个引用，useEffect , useMemo ,useCallback ,子组件属性传递
        等如果依赖的是这个代理对象是不会引起重新执行。
      </h3>
      <UseReactiveExample2></UseReactiveExample2>
    </div>
  );
};
const UseReactiveExample = () => {
  const state = useReactive({
    count: 0,
    InputVal: '',
    obj: {
      value: '',
    },
  });

  return (
    <div>
      <p> state.count：{state.count}</p>

      <Button onClick={() => state.count++}>state.count++</Button>
      <Button onClick={() => state.count--}>state.count--</Button>

      <p style={{ marginTop: 20 }}> state.InputVal: {state.InputVal}</p>
      <Input onChange={(e) => (state.InputVal = e.target.value)} />

      <p style={{ marginTop: 20 }}> state.obj.value: {state.obj.value}</p>
      <Input onChange={(e) => (state.obj.value = e.target.value)} />
    </div>
  );
};
const UseReactiveExample2 = () => {
  const state = useReactive({ count: 0 });
  const [stateCount, setStateCount] = useState(0);

  const state2 = useReactive({ count: 0 });
  const [stateCount2, setStateCount2] = useState(0);

  // Depends on the object, because it is always the same reference, it will not be executed
  useEffect(() => {
    setStateCount(stateCount + 1);
    // state的引用不变
  }, [state]);

  // Depends on the underlying data type, so as long as it changes, it will be re-executed
  useEffect(() => {
    setStateCount2(stateCount2 + 1);
  }, [state2.count]);

  return (
    <div>
      <Button style={{ marginTop: 20 }} onClick={() => (state.count += 1)}>
        stateCount + 1
      </Button>
      <p>stateCount:{stateCount}</p>

      <Button style={{ marginTop: 20 }} onClick={() => (state2.count += 1)}>
        stateCount2 + 1
      </Button>
      <p>stateCount2:{stateCount2}</p>
    </div>
  );
};
storiesOf('useReactive', module).add('useReactive', useReactiveStory);
