import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    // useEffect가 다시 실행되면 항상 return 부분이 실행됨
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
