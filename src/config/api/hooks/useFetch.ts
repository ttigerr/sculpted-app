import { useEffect, useState } from "react";

const useFetch = <T> ( 
    fetchFunction: () => Promise<T>, //dynamic fetch function to retrieve data
    autoFetch?: boolean  //if set to true, retrieve on initial render
) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
        } catch (error) {
            setError(error instanceof Error ? error : new Error('Unable to retrieve data.'))
        } finally {
            setIsLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setIsLoading(false);
        setError(null);
    };

    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    }, [])

    return { data, isLoading, error, reset, refetch: fetchData};
};

export default useFetch;