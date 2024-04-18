import { storiesOf } from '@storybook/react';
storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <div>
        <h2>模仿ahooks</h2>
        <div>
          官网 <a href="https://ahooks.js.org/">https://ahooks.js.org/</a>
          <div>源码解析：</div>
          {[
            'useMemoizedFn',
            'createEffectWithTarget',
            'createDeepCompareEffect',
            'createUpdateEffect',
            'useDynamicList',
            'useControllableValue',
            'useEventEmitter',
            'useThrottleFn',
            'useDebounceFn',
            'useCreation',
            'useEventListener',
            'useInfiniteScroll',
            'useSize',
            'useVirtualList',
            'useTextSelection',
            'useClickAway',
            'useFocusWithin',
            'useHover',
            'useDrag',
            'useDrop',
            'usePrevious',
            'useSafeState',
            'useUnmountedRef',
            'useSetState',
            'useRequest',
            'usePagination',
          ].map((val) => (
            <div key={val}>{val}</div>
          ))}
        </div>
      </div>
    );
  },
  {
    info: { disable: true },
  }
);
