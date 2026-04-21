import { useCallback, useState } from 'react';

export function useAsync(fn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        return await fn(...args);
      } catch (err) {
        setError(err?.message || 'Something went wrong');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fn],
  );

  return { run, loading, error };
}
