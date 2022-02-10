import { useMemo } from "react";
import useToggle from "../useToggle";

export interface Actions {
  setTrue: () => void
  setFalse: () => void
  set: (val: boolean) => void
  toggle: () => void
}
const useBoolean = (defaultValue = false): [boolean, Actions] => {
  const [state, { toggle, set} ] = useToggle(defaultValue);
  const setTrue = () => set(true);
  const setFalse = () => set(false);
  const actions: Actions= useMemo(() => {
    return {
      toggle,
      set,
      setTrue,
      setFalse
    }
  }, [])
  return [state, actions]
}
export const useBooleanTest = () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setFalse} style={{ margin: '0 16px' }}>
          Set false
        </button>
        <button type="button" onClick={setTrue}>
          Set true
        </button>
      </p>
    </div>
  );
};

export default useBoolean