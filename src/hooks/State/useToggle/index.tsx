import { useMemo, useState } from "react"

export interface Actions<T> {
  setLeft: () => void
  setRight: () => void
  set: (value: T) => void
  toggle: () => void
}
function useToggle<T = boolean>():[boolean, Actions<T>]
function useToggle<T>(defaultValue: T): [T, Actions<T>]
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T|U, Actions<T | U>]
function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue)
  const actions = useMemo(() => {
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R
    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue) )
    const setLeft = () => setState(defaultValue)
    const setRight = () => setState(reverseValueOrigin)
    const set = (value:D|R) => setState(value)
    return {
      toggle,
      setLeft,
      setRight,
      set
    }
  }, [])
  return [state, actions]
}
export const useToggleTest = () => {
  const [state, { toggle, set, setLeft, setRight }] = useToggle('Hello', 'World');

  return (
    <div>
      <p>Effects：{state}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={() => set('Hello')} style={{ margin: '0 8px' }}>
          Set Hello
        </button>
        <button type="button" onClick={() => set('World')}>
          Set World
        </button>
        <button type="button" onClick={setLeft} style={{ margin: '0 8px' }}>
          Set Left
        </button>
        <button type="button" onClick={setRight}>
          Set Right
        </button>
      </p>
    </div>
  );
};
export default useToggle