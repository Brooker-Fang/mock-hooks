import { BasicTarget, getTargetElement } from '../../../utils/domTarget';
import useIsomorphicLayoutEffectWithTarget from '../../../utils/useIsomorphicLayoutEffectWithTarget';
import useRafState from '../../State/useRafState';

type Size = { width: number; height: number };
function useSize(target: BasicTarget): Size | undefined {
  const [state, setState] = useRafState<Size>();

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const el = getTargetElement(target);

      if (!el) {
        return;
      }

      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { clientWidth, clientHeight } = entry.target;
          setState({
            width: clientWidth,
            height: clientHeight,
          });
        });
      });

      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    },
    [],
    target
  );

  return state;
}

export default useSize;
