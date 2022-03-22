import { useState } from 'react';
import { isBrowser } from '../../../utils';
import useEventListener from '../useEventListener';

type visibilityState = 'hidden' | 'visible' | 'prerender' | undefined;

const getVisibility = () => {
  if (!isBrowser()) {
    return 'visible';
  }
  return document.visibilityState;
};

function useDocumentVisibility(): visibilityState {
  const [documentVisibility, setDocumentVisibility] = useState(() => getVisibility());

  useEventListener(
    'visibilitychange',
    () => {
      setDocumentVisibility(getVisibility());
    },
    {
      target: () => document,
    }
  );
  return documentVisibility;
}
export default useDocumentVisibility;
