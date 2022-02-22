import { memo, useCallback, useMemo, useRef, useState } from "react"

type noop = (...args: any[]) => any

function useMemoizedFn<T extends noop>(fn:T) {
  if(process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`)
    }
  }

  const fnRef = useRef<T>(fn)
  fnRef.current = useMemo(() => fn, [fn])
  const memoizedFn = useRef<T>()
  if(!memoizedFn.current) {
    memoizedFn.current = function(...args) {
      // @ts-ignore
      return fnRef.current.apply(this as any, args)
    } as T
  }
  return memoizedFn.current
}

export default useMemoizedFn