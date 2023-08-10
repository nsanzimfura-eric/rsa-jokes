import { useState } from "react";

const useFetchJokes = ()=>{
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchJokes = async (url)=>{
        setLoading(true);
        try {
            const response = await fetch(url);
            const res = await response.json();
            setData(res);
            setLoading(false)
            
        } catch (error) {
            setError(error?.message)
            setLoading(false)
            
        }
    }
    return {loading, data, error, fetchJokes}

}

export default useFetchJokes;