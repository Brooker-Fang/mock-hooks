import { useState } from 'react';
import { BasicTarget, getTargetElement } from '../../../utils/domTarget';
import useLatest from '../../Advanced/useLatest';
import screenfull from 'screenfull';
import useUnmount from '../../LifeCycle/useUnmount';
import useMemoizedFn from '../../Advanced/useMemoizedFn';

interface Options {
  onExit?: () => void;
  onEnter?: () => void;
}
const useFullscreen = (target: BasicTarget, options: Options) => {
  const { onEnter, onExit } = options;
  const onEnterRef = useLatest(onEnter);
  const onExitRef = useLatest(onExit);

  const [state, setState] = useState(false);

  const onChange = () => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = screenfull;
      if (isFullscreen) {
        onEnterRef.current?.();
      } else {
        screenfull.off('change', onChange);
        onExitRef.current?.();
      }
      setState(isFullscreen);
    }
  };

  const enterFullscreen = () => {
    const el = getTargetElement(target);
    if (!el) {
      return;
    }

    if (screenfull.isEnabled) {
      try {
        screenfull.request(el);
        screenfull.on('change', onChange);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const exitFullscreen = () => {
    if (!state) {
      return;
    }
    if (screenfull.isEnabled) {
      screenfull.exit();
    }
  };

  const toggleFullscreen = () => {
    if (state) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useUnmount(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', onChange);
    }
  });

  return [
    state,
    {
      enterFullscreen: useMemoizedFn(enterFullscreen),
      exitFullscreen: useMemoizedFn(exitFullscreen),
      toggleFullscreen: useMemoizedFn(toggleFullscreen),
      isEnabled: screenfull.isEnabled,
    },
  ] as const;
};
