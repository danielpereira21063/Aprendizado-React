import { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null);

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);


    const [loading, setLoading] = useState(false)

    const httpConfig = (data, method) => {
        if (method == "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            const res = await fetch(url);

            const json = await res.json();

            setData(json);
        }

        fetchData();
        setLoading(false)
    }, [url, callFetch]);


    useEffect(() => {
        const httpRequest = async () => {
            if (method == "POST") {
                let fetchOptions = [url, config];

                const res = await fetch(...fetchOptions);
                const json = await res.json();


                setCallFetch(json);
            }
        }

        httpRequest();
    }, [config]);

    return { data, httpConfig, loading };
}

export default useFetch;