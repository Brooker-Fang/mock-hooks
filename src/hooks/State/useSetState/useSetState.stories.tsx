import { storiesOf } from '@storybook/react';
import useSetState from '.';

const useSetStateStroy = () => {
  return (
    <div>
      <p>管理 object 类型 state 的 Hooks，用法与 class 组件的 this.setState 基本一致。</p>
      <p>
        主要用于state是对象时
        {`
        如 state = {
          "hello": "world",
          "count": 6,
          "foo": "bar"
        }
      `}
        <br />
        如果只要改变count的值
        <br></br>
        原来的setState: {`setState({...state, count: state.count+1})`}
        <br></br>
        使用useSetState后的setState:: {`setState({count: state.count+1})`}
      </p>
      <h3>使用</h3>
      <code>
        {`
        const [state, setState] = useSetState<T extends Record<string, any>>(
          initialState: T = {} as T
        ): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void]`}
      </code>
      <h3>使用</h3>
      <UseSetStateExample></UseSetStateExample>
    </div>
  );
};
interface State {
  hello: string;
  count: number;
  [key: string]: any;
}
const UseSetStateExample = () => {
  const [state, setState] = useSetState<State>({
    hello: '',
    count: 0,
  });

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setState({ hello: 'world' })}>
          set hello
        </button>
        <button type="button" onClick={() => setState({ foo: 'bar' })} style={{ margin: '0 8px' }}>
          set foo
        </button>
        <button type="button" onClick={() => setState((prev) => ({ count: prev.count + 1 }))}>
          count + 1
        </button>
      </p>
    </div>
  );
};
storiesOf('useSetState', module).add('useSetState', useSetStateStroy);
