import axios from "axios";
import { useEffect, useState } from "react";

const baseURL = "https://dev.bein.az/controllers/";

export default function useRequest(url,obj) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    Object.assign(obj,{token: localStorage.getItem("Token")})

    useEffect(() => {
        if(url) {
            setLoading(true)
            axios.post(baseURL + url, obj)
            .then(res => {
                if (
                    obj.token === "" ||
                    res.data.Headers?.ResponseStatus === "104" ||
                    res.data.Headers?.ResponseStatus === "103"
                ) {
                    localStorage.removeItem("Token");
                    setError(res.data.Body);
                    return null;
                }
                if (res.data.Headers?.ResponseStatus !== "0") {
                    setError(res.data.Body);
                    return null;
                }
                return res
            })
            .then(response => {
                if(response !== null) {
                    setData(response.data.Body)
                }else{
                    setError('error')
                }
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
        }
    },[])

    return { data, loading, error }
}