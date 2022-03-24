import { isBrowser } from '../../../utils';
import useEffectWithTarget from '../../../utils/useEffectWithTarget';
import useLayoutEffectWithTarget from '../../../utils/useLayoutEffectWithTarget';
/* 
  在 SSR 模式下，使用 useLayoutEffect 时，会出现以下警告

⚠️ Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://fb.me/react-uselayouteffect-ssr for common fixes.

  为了避免该警告，可以使用 useIsomorphicLayoutEffect 代替 useLayoutEffect。

*/

const useIsomorphicLayoutEffectWithTarget = isBrowser() ? useLayoutEffectWithTarget : useEffectWithTarget;

export default useIsomorphicLayoutEffectWithTarget;
