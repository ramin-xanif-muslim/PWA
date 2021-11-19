import React, { useState } from "react"; 
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import axios from 'axios'
import { Redirect } from "react-router";


export default function LoginPage() {
    const[data, setData] = useState({'Login': '', 'Password': ''})
    const[isLogin, setIsLogin] = useState(false)
    const[error, setError] = useState("")
    let postToServer = () => {
        async function fetchToken() {
            const res = await axios.post('https://pwa.bein.az/login/send.php', data)
            console.log(res)
            if(res.data.Headers.ResponseStatus === '0') {
            localStorage.setItem('Token', res.data.Body.Token)
            setIsLogin(true)
            }else setError(res.data.Body)
        }
        fetchToken()
    }
    return(
        <div>
            {isLogin && <Redirect to='/' /> }
            <h2 className="red-text text-center">Login</h2>
            {error ? <h3 style={{color: 'red'}}>{error}</h3> : ''}
            <MyInput type='text' name='name' onChange={e=>setData({...data,'Login': e.target.value})} />
            <MyInput type='password' name='password' onChange={e=>setData({...data,'Password': e.target.value})} />
            <MyButton onClick={postToServer}>Submit</MyButton>
        </div>
    )
}