import React, { useEffect, useState } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import sendRequest from "../confiq/sentRequest";
import classes from '../components/UI/input/MyInput.module.css';
import { FaRegTimesCircle, FaSyncAlt,FaTelegramPlane } from "react-icons/fa";
import MyLoading from "../components/UI/loading/MyLoading";
import { Redirect } from "react-router";
import CloseAndSaveButtons from "../components/UI/button/CloseAndSaveButtons";
import MyTextarea from "../components/UI/textarea/MyTextarea";


export default function NewCustomerPage() {

    const [groups,setQroups] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [ isCloseButton, setIsCloseButton] = useState(false)

    useEffect( async () => {
        setIsLoading(true)
        let res = await sendRequest('customergroups/get.php',{im:'100'})
        setQroups(res.List)
        setIsLoading(false)
    },[])

    function getBarkod() {
        const fetchBarkod = async() => {
            let d= { pg: 0, dr: 1, w: 2, }
            let res = await sendRequest('barcode/get.php',d)
            setData({...data,Barkod: res })
        }
        fetchBarkod()
    }
    

    const [data, setData] = useState({
        name: '',
        Barkod: '',
        Telefon: '',
        GrupSecin: '',
        Endirim: '',
        Bonus: '',
        Email: '',
        MayaGiymeti: '',
        Comment: '',
    })

    const saveButton = () => {
        sendRequest('products/put.php',data)
        setData({
            name: '',
            Barkod: '',
            Telefon: '',
            GrupSecin: '',
            Endirim: '',
            Bonus: '',
            Email: '',
            Comment: '',
        })
    }
    const closeButton = () => {
        setIsCloseButton(true)
    }
    if(isLoading) {
        return <MyLoading />
    }
    if(isCloseButton) {
        return <Redirect to='/'/>
    }

	return(
        <div>
            <h2 className="red-text text-center">Məhsul</h2>
        <div>
            <MyInput type="text" placeholder='Ad' value={data.name}
             onChange={(e) => setData({...data,name: e.target.value})} /> 
             
            <div style={{display: 'flex'}}>
             <button className="barcode-button" onClick={getBarkod} ><FaSyncAlt style={{fontSize:'20px'}} /></button>   
            <MyInput style={{borderRadius: "0 0.3rem 0.3rem 0"}} placeholder='Barkod' type='text'name='Barkod'
             value={data.Barkod} onChange={(e) => setData({...data,Barkod: e.target.value})} />
             </div>
            
            <MyInput type='text' placeholder='Telefon' value={data.Telefon} 
             onChange={(e) => setData({...data,Telefon: e.target.value})} />  
  
            <select onChange={(e) => setData({...data,GrupSecin: e.target.value})} className={`${classes.myInput} form-control form-control-lg`}>
              <option defaultValue>Qrup secin...</option>
              { groups ? Object.values(groups).map(item => { 
                  return <option key={item.Id} value={item.Name}>{item.Name}</option>}) : ''}
            </select>     

            <MyInput type='text' placeholder='Endirim' value={data.Endirim}
             onChange={(e) => setData({...data,Endirim: e.target.value})} />  
                
            <MyInput type='text' placeholder='Bonus' value={data.Bonus}
             onChange={(e) => setData({...data,Bonus: e.target.value})} />  
                
            <MyInput type='email' placeholder='Email' value={data.Email}
             onChange={(e) => setData({...data,Email: e.target.value})} />

            <MyTextarea value={data.Comment} onChange={(e) => setData({...data, Comment: e.target.value })} />

             <CloseAndSaveButtons closeButton={closeButton} saveButton={saveButton} />

        </div>
        </div>
	)
  }
