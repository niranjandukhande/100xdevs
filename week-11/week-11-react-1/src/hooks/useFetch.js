import { useEffect, useState } from "react";

export function useFetch(url){
    const [finalData, setFinalData] = useState({});
    const [loading, setLoading] = useState(true)

    async function getData(){
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setFinalData(json);
        setLoading(false);
    }

    useEffect(()=>{
        getData();
    },[url])

    return {
        finalData,
        loading
    }
}