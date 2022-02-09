import { useCallback, useState } from "react"
import { isFunction } from "../../../utils";

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void
/* 
  主要用于state是对象时
   如 state = {
    "hello": "world",
    "count": 6,
    "foo": "bar"
  }
  如果只要改变count的值
   原来的setState，setState({...state, count: state.count+1})
  使用useState后的setState: 只需要 setState({count: state.count+1})
*/
const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S)
  ):[S, SetState<S>] => {
    const [state, setState] = useState<S>(initialState);
    const setMergeState = useCallback((patch) => {
      setState((prevState) => {
        const newState = isFunction(patch) ? patch(prevState) : patch
        return newState? {...prevState, ...newState}:prevState
      })
    }, [])
    return [state, setMergeState]
}
export default useSetState