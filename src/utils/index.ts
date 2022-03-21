import type { DependencyList } from 'react';
export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export const isBrowser = (): boolean => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

export default function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
  if (oldDeps === deps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
}
