import { storiesOf } from '@storybook/react';
import { Button, Input } from 'antd';
import { useState } from 'react';
import usePrevious from '.';
const usePreviousStory = () => {
  return (
    <div>
      <p>保存上一次状态的 Hook。</p>
      <h3>使用</h3>
      <p>
        {`
          const previousState: T = usePrevious<T>(
            state: T,
            shouldUpdate?: (prev: T | undefined, next: T) => boolean
          );
        `}
      </p>
      <h3>示例</h3>
      <p>
        <UsePreviousExample></UsePreviousExample>
      </p>
    </div>
  );
};
interface Person {
  name: string;
  job: string;
}

const nameCompareFunction = (prev: Person | undefined, next: Person) => {
  if (!prev) {
    return true;
  }
  if (prev.name !== next.name) {
    return true;
  }
  return false;
};

const jobCompareFunction = (prev: Person | undefined, next: Person) => {
  if (!prev) {
    return true;
  }
  if (prev.job !== next.job) {
    return true;
  }
  return false;
};
const UsePreviousExample = () => {
  const [state, setState] = useState({ name: 'Jack', job: 'student' });
  const [nameInput, setNameInput] = useState('');
  const [jobInput, setJobInput] = useState('');
  const previousName = usePrevious(state, nameCompareFunction);
  const previousJob = usePrevious(state, jobCompareFunction);

  return (
    <>
      <div style={{ margin: '8px 0', border: '1px solid #e8e8e8', padding: 8 }}>
        <div>current name: {state.name}</div>
        <div>current job: {state.job}</div>
      </div>
      <div>previous name: {(previousName || {}).name}</div>
      <div style={{ marginBottom: 8 }}>previous job: {(previousJob || {}).job}</div>
      <div style={{ marginTop: 8 }}>
        <Input style={{ width: 220 }} value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="new name" />
        <Button
          onClick={() => {
            setState((s) => ({ ...s, name: nameInput }));
          }}
          style={{ marginLeft: 8 }}
        >
          update
        </Button>
      </div>
      <div style={{ marginTop: 8 }}>
        <Input style={{ width: 220 }} value={jobInput} onChange={(e) => setJobInput(e.target.value)} placeholder="new job" />
        <Button
          onClick={() => {
            setState((s) => ({ ...s, job: jobInput }));
          }}
          style={{ marginLeft: 8 }}
        >
          update
        </Button>
      </div>
    </>
  );
};
storiesOf('usePrevious', module).add('usePrevious', usePreviousStory);
