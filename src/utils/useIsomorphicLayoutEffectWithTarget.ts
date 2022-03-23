import { isBrowser } from '.';
import useEffectWithTarget from './useEffectWithTarget';
import useLayoutEffectWithTarget from './useLayoutEffectWithTarget';

const useIsomorphicLayoutEffectWithTarget = isBrowser() ? useLayoutEffectWithTarget : useEffectWithTarget;

export default useIsomorphicLayoutEffectWithTarget;
