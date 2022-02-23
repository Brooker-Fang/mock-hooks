import { useEffect } from 'react';
import { createUpdateEffect } from '../createUpdateEffect/indedx';

const useUpdateEffect = createUpdateEffect(useEffect);
export default useUpdateEffect;
