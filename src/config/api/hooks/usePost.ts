import { useCallback, useState } from 'react';

const usePost = <T, A extends unknown[] = []>(
  postFunction: (...args: A) => Promise<T>,
) => {
  const [data, setData] = useState<T | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = useCallback(
    async (...args: A) => {
      try {
        setIsSubmitting(true);
        setError(null);
        const response = await postFunction(...args);
        setData(response);
        return response;
      } catch (e) {
        const err = e instanceof Error ? e : new Error('Unable to submit data.');
        setError(err);
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [postFunction],
  );

  const reset = () => {
    setData(null);
    setIsSubmitting(false);
    setError(null);
  };

  return { data, isSubmitting, error, reset, postData };
};

export default usePost;
