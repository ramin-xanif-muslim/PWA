import { useEffect, useState } from "react";

export default function useRequest(request) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        request()
        .then(response => {
            if(response !== null) {
                setData(response.data.Body)
            }else{
                setError('error')
            }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    },[])

    return [data, loading, error]
}