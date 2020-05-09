import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useInitialQueryValueFromRouter = (
  key: string,
  callback: (val: string | string[]) => void,
): void => {
  const router = useRouter();

  useEffect(() => {
    const { query } = router;

    const value = query[key];
    if (!!value || Array.isArray(value)) {
      callback(value);
    }
  }, [router]);
};
