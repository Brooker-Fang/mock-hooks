import { storiesOf } from '@storybook/react';
import { useMemo, useRef } from 'react';
import useVirtualList from '.';

const useVirtualListStory = () => {
  return (
    <div>
      <p>提供虚拟化列表能力的 Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。</p>
      <h3>使用</h3>
      <code>
        {`
          const [list, scrollTo]= useVirtualList<T>(
            originalList: T[],
            options: {
              containerTarget: (() => Element) | Element | MutableRefObject<Element>,
              wrapperTarget: (() => Element) | Element | MutableRefObject<Element>,
              itemHeight: number | ((index: number, data: T) => number),
              overscan?: number,
            }
          );
        `}
      </code>
      <h3>示例</h3>
      <UseVirtualListExample></UseVirtualListExample>
    </div>
  );
};
const UseVirtualListExample = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const originalList = useMemo(() => Array.from(Array(99999).keys()), []);

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 60,
    overscan: 10,
  });
  return (
    <>
      <div ref={containerRef} style={{ height: '300px', overflow: 'auto', border: '1px solid' }}>
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: 52,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
storiesOf('useVirtualList', module).add('useVirtualList', useVirtualListStory);
