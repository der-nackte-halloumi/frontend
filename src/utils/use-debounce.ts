import { useState, useEffect } from 'react';

// see https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
export default function useDebounce<T = {}>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}
