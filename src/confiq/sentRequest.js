
import axios from "axios";
import { Redirect } from "react-router";


const instace = axios.create({
    baseURL: 'https://pwa.bein.az/controllers/'
})


async function sendRequest(url, obj) {

    obj.token = localStorage.getItem('Token')

    let res = await instace.post(url, obj)
    
    if(obj.token === "" || res.data.Headers.ResponseStatus === '104' || res.data.Headers.ResponseStatus === '103' ) {
        localStorage.removeItem('Token')
        alert(res.data.Body)
        return <Redirect to='login'/>
    }
    if(res.data.Headers.ResponseStatus !== '0') {
        alert(res.data.Body)
        return <Redirect to='login'/>
    }
    console.log('Body',res.data.Body)
    return res.data.Body
}

export default sendRequest
