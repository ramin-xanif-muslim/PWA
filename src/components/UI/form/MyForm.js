import React, { useState } from 'react'
import MyButton from '../button/MyButton'
import MyInput from '../input/MyInput'

function MyForm() {
    const[data,setData] = useState({name: '', email: '', password: ''})

    return (
        <div>
            <form>
                <div>
                <label>name</label>
                <MyInput type='text'name='name' value={data.name} onChange={e => setData(data.name = e.target.value)} /> 
                </div>
                <div>
                <label>email</label>
                <MyInput type='email'name='email' value={data.email} onChange={e => data.email = e.target.value} /> 
                </div>
                <div>
                <label>password</label>
                <MyInput type='password'name='password' value={data.password} onChange={e => data.password = e.target.value} />  
                </div>
            </form>
            <MyButton onClick={() => console.log(data)}>Submit</MyButton>
        </div>
    )
}

export default MyForm
