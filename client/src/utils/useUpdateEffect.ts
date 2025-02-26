import { useEffect, useRef } from 'react';

// Define the types for the callback and dependencies
type Callback = () => void | (() => void);
type Dependencies = ReadonlyArray<any>;

export default function useUpdateEffect(callback: Callback, dependencies: Dependencies): void {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
    // eslint-disable-next-line
  }, dependencies);
}
