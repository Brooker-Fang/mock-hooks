import { storiesOf } from '@storybook/react';

const useEventEmitterStory = () => {
  return (
    <div>
      <h3>借助useEventEmitter 在多个组件之间进行事件通知 </h3>
      <h3>使用</h3>
      <p>
        {`
          const event$ = useEventEmitter()
          {/* 订阅 */}
          event$.useSubscription(val => {
            ...
          }) 
          event$.emit('hello')
          `}
      </p>
    </div>
  );
};
storiesOf('useEventEmitter', module).add('useEventEmitter', useEventEmitterStory);
