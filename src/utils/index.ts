export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export const isBrowser = (): boolean => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
