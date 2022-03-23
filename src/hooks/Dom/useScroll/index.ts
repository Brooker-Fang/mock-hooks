import { BasicTarget, getTargetElement } from '../../../utils/domTarget';
import useEffectWithTarget from '../../../utils/useEffectWithTarget';
import useLatest from '../../Advanced/useLatest';
import useRafState from '../../State/useRafState';

type Position = { left: number; top: number };

type Target = BasicTarget<Element | Document>;
type ScrollListenController = (val: Position) => boolean;
// 监听元素的滚动位置。
const useScroll = (target?: Target, shouldUpdate: ScrollListenController = () => true) => {
  const [position, setPosition] = useRafState<Position>();
  const shouldUpdateRef = useLatest(shouldUpdate);
  useEffectWithTarget(
    () => {
      const el = getTargetElement(target, document);
      if (!el) {
        return;
      }
      const updatePosition = () => {
        let newPosition: Position;
        if (el === document) {
          if (document.scrollingElement) {
            newPosition = {
              left: document.scrollingElement.scrollLeft,
              top: document.scrollingElement.scrollTop,
            };
          } else {
            newPosition = {
              left: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop),
              top: Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft),
            };
          }
        } else {
          newPosition = {
            left: (el as Element).scrollLeft,
            top: (el as Element).scrollTop,
          };
        }
        if (shouldUpdateRef.current(newPosition)) {
          setPosition(newPosition);
        }
      };
      updatePosition();

      el.addEventListener('scroll', updatePosition);
      return () => {
        el.removeEventListener('scroll', updatePosition);
      };
    },
    [],
    target
  );
};
export default useScroll;
