import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import useUnmountedRef from '../../LifeCycle/useUnmountedRef';

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback((currentState) => {
    if (unmountedRef.current) return;
    setState(currentState);
  }, []);
  return [state, setCurrentState] as const;
}

export default useSafeState;
