import { useCallback, useEffect, useRef, useState } from 'react';

type UseFetchOptions = {
  autoFetch?: boolean;
  deps?: ReadonlyArray<unknown>;
};

// Dynamic data-fetching hook.
// Pass `deps` so changes to the fetchFunction's captured values (e.g. a
// `fromDate` prop) refetch instead of serving a stale closure.
const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  options: UseFetchOptions = {},
) => {
  const { autoFetch, deps = [] } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFunction();
      if (!controller.signal.aborted) setData(result);
    } catch (e) {
      if (!controller.signal.aborted) {
        setError(e instanceof Error ? e : new Error('Unable to retrieve data.'));
      }
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const reset = () => {
    setData(null);
    setIsLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) fetchData();
    return () => abortRef.current?.abort();
  }, [autoFetch, fetchData]);

  return { data, isLoading, error, reset, refetch: fetchData };
};

export default useFetch;
