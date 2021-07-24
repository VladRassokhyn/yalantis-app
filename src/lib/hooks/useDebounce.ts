import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebounced, setIsDebounced] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDebounced(false)
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
      setIsDebounced(true)
    };
  }, [value, delay]);

  return { debouncedValue, isDebounced };
};
