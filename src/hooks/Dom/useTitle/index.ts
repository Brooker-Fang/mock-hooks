import { useEffect, useRef } from 'react';
import { isBrowser } from '../../../utils';
import useUnmount from '../../LifeCycle/useUnmount';

interface Options {
  restoreOnUnmount?: boolean;
}
const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};
function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {
  const titleRef = useRef(isBrowser() ? document.title : '');
  useEffect(() => {
    document.title = title;
  }, [title]);
  useUnmount(() => {
    if (options.restoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
}
export default useTitle;
