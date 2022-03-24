import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setSate] = useState({});
  return useCallback(() => setSate({}), []);
};
export default useUpdate;
