import { useState } from 'react';
import { BasicTarget, getTargetElement } from '../../../utils/domTarget';
import useEffectWithTarget from '../../../utils/useEffectWithTarget';

interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: BasicTarget<Element>;
}
const useInViewport = (target: BasicTarget, options?: Options) => {
  const [state, setState] = useState<boolean>();
  const [ratio, setRatio] = useState<number>();

  useEffectWithTarget(
    () => {
      const el = getTargetElement(target);
      if (!el) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setRatio(entry.intersectionRatio);
            if (entry.isIntersecting) {
              setState(true);
            } else {
              setState(false);
            }
          }
        },
        {
          ...options,
          root: getTargetElement(options?.root),
        }
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    },
    [],
    { target }
  );
  return [state, ratio] as const;
};
