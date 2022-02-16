import Cookies from 'js-cookie'
import { useState } from 'react';
import { isFunction } from '../../../utils';
import useMemoizedFn from '../../Advanced/useMemoizedFn';

export type State = string | undefined
export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State)
}
const useCookieState = (cookieKey:string, options: Options) => {
  const [state, setState] = useState<State>(() => {
    const cookieValue = Cookies.get(cookieKey)

    if(typeof cookieValue === 'string') return cookieValue
    if(isFunction(options.defaultValue)) {
      return options.defaultValue()
    }
    return options.defaultValue
  })
  const updateState = useMemoizedFn(
    (newValue: State | ((prevState: State) => State), newOptions: Cookies.CookieAttributes = {}) => {
      const { defaultValue, ...restOptions } = { ...options, ...newOptions }
      setState((prevState) => {
        const value = isFunction(newValue) ? newValue(prevState) : newValue
        if (value === undefined) {
          Cookies.remove(cookieKey)
        } else {
          Cookies.set(cookieKey, value, restOptions)
        }
        return value
      })
     
    }
    
  )
  return [state, updateState] as const
}
export function textUseCookieState () {
  const [value, setValue] = useCookieState('useCookieStateOptions', {
    defaultValue: '0',
    path: '/',
    expires: (() => new Date(+new Date() + 10000))(),
  });

  return (
    <>
      <p>{value}</p>
      <button
        type="button"
        style={{ marginRight: 16 }}
        onClick={() =>
          setValue((v) => String(Number(v) + 1), {
            expires: (() => new Date(+new Date() + 10000))(),
          })
        }
      >
        inc + (10s expires)
      </button>
      <button
        type="button"
        style={{ marginRight: 16 }}
        onClick={() =>
          setValue((v) => String(Number(v) - 1), {
            expires: (() => new Date(+new Date() + 10000))(),
          })
        }
      >
        dec - (10s expires)
      </button>
      <button type="button" onClick={() => setValue('0')}>
        reset
      </button>
    </>
  );
}
export default useCookieState