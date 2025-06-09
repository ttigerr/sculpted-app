import { useState } from "react"

const usePost = <T> (postFunction: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const postData = async () => {
        try {
            setIsSubmitting(true);
            setError(null);

            const response = await postFunction();
            setData(response);
        } catch (error) {
            setError(error instanceof Error ? error : new Error('Unable to submit data.'))
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setData(null);
        setIsSubmitting(false);
        setError(null);
    };

    return { data, isSubmitting, error, reset, postData };
}

export default usePost;