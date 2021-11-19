import React, { useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import sendRequest from "../confiq/sentRequest";
import classes from '../components/UI/input/MyInput.module.css';
import { FaTelegramPlane } from "react-icons/fa";



export default function WithForm( {formData} ) {

    const [data, setData] = useState({})
    
    formData.inputData.map( i => setData({ ...data, i: i }))

    const submitProduct = () => {
        sendRequest(formData.url,{})
        formData.inputData.map( i => setData({ ...data, i: '' }))
    }
    let select = <select onChange={(e) => setData({...data,GrupSecin: e.target.value})} className={`${classes.myInput} form-control form-control-lg`}>
      <option selected>Qrup secin...</option>
      <option>One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    let textarea = <textarea placeholder='Şərh' class="form-control" value={data.Comment}
    onChange={(e) => setData({...data, Comment: e.target.value })}
     id="exampleFormControlTextarea1" rows="3" style={{fontSize: '20px'}}/> 

	return(
        <div>
            <h2 className="red-text text-center">Məhsul</h2>
        <div>
            {
                formData.inputData.map( i => <MyInput id="inputID" type="text" placeholder={i} value={data.i}
                onChange={(e) => setData({...data,name: e.target.value})} />)
            }
            {
                formData.select ? select : null
            }
            {
                formData.textarea ? textarea : null
            }
            <MyButton onClick={submitProduct}><FaTelegramPlane/>Yadda saxla</MyButton>
        </div>
        </div>
	)
  }