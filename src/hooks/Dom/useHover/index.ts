import { BasicTarget } from '../../../utils/domTarget';
import useBoolean from '../../State/useBoolean';
import useEventListener from '../useEventListener';

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
}
export default (target: BasicTarget, options?: Options): boolean => {
  const { onEnter, onLeave } = options || {};
  const [state, { setTrue, setFalse }] = useBoolean(false);
  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
    },
    {
      target,
    }
  );
  useEventListener(
    'mouseleave',
    () => {
      onLeave?.();
      setFalse();
    },
    {
      target,
    }
  );
  return state;
};
