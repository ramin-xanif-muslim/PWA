import React, { useEffect, useState } from "react";
import MyInput from "../components/UI/input/MyInput";
import sendRequest from "../confiq/sentRequest";
import classes from '../components/UI/input/MyInput.module.css';
import { FaSyncAlt } from "react-icons/fa";
import CloseAndSaveButtons from "../components/UI/button/CloseAndSaveButtons";
import MyTextarea from "../components/UI/textarea/MyTextarea";

const NewProduc = () => {

    const [data, setData] = useState({
        name: '',
        Barkod: '',
        Artkod: '',
        GrupSecin: '',
        AlishGiymeti: '',
        MinimumQiymet: '',
        SatishGiymeti: '',
        MayaGiymeti: '',
        Comment: '',
    })
    const [options,setOptions] = useState('')

    const saveButton = async () => {
        await sendRequest('products/put.php',data)
        setData({
            name: '',
            Barkod: '',
            Artkod: '',
            GrupSecin: '',
            AlishGiymeti: '',
            MinimumQiymet: '',
            SatishGiymeti: '',
            MayaGiymeti: '',
            Comment: '',
        })
    }
    
    useEffect(() => {
        fetchProductfolders()
    }, [])

    const fetchProductfolders = async () => {
        const data = { lm: 100, }
        let res = await sendRequest('productfolders/get.php',data)
        setOptions(res.List)
        console.log(res.List)
    }

    function getBarkod() {
        const fetchBarkod = async() => {
            let d= { pg: 0, dr: 1, w: 0, sr: 'GroupName', }
            let res = await sendRequest('barcode/get.php',d)
            setData({...data,Barkod: res })
        }
        fetchBarkod()
    }

	return(
        <div>
            <h2 className="red-text text-center">Məhsul</h2>
        <div>
            <MyInput id="inputID" type="text" placeholder='Ad' value={data.name}
             onChange={(e) => setData({...data,name: e.target.value})} /> 

             <div style={{display: 'flex'}}>
              <button className="barcode-button" onClick={getBarkod} ><FaSyncAlt style={{fontSize:'20px'}} /></button>   
             <MyInput style={{borderRadius: "0 0.3rem 0.3rem 0"}} placeholder='Barkod' type='text'name='Barkod'
              value={data.Barkod} onChange={(e) => setData({...data,Barkod: e.target.value})} />
              </div>
            
            <MyInput id="inputID" type='text' placeholder='Artkod' value={data.Artkod}
             onChange={(e) => setData({...data,Artkod: e.target.value})} />  
  
            <select onChange={(e) => setData({...data,GrupSecin: e.target.value})} className={`${classes.myInput} form-control form-control-lg`}>
              <option defaultValue>Qrup secin...</option>
              {options ? Object.values(options).map( option => {
                  return <option key={option.Id} value={option.Id}>{option.Name}</option>
              }) : ''}
            </select>    

            <MyInput id="inputID" type='text' placeholder='Alish giymeti' name='AlishGiymeti' value={data.AlishGiymeti}
             onChange={(e) => setData({...data,AlishGiymeti: e.target.value})} />  
                
            <MyInput id="inputID" type='text' placeholder='Minimum qiymet' name='MinimumQiymet' value={data.MinimumQiymet}
             onChange={(e) => setData({...data,MinimumQiymet: e.target.value})} />  
                
            <MyInput id="inputID" type='text' placeholder='Satish giymeti' name='SatishGiymeti' value={data.SatishGiymeti}
             onChange={(e) => setData({...data,SatishGiymeti: e.target.value})} />  
                
            <MyInput id="inputID" type='text' placeholder='Maya giymeti' name='MayaGiymeti' value={data.MayaGiymeti}
             onChange={(e) => setData({...data,MayaGiymeti: e.target.value})} /> 

            <MyTextarea value={data.Comment} onChange={(e) => setData({...data, Comment: e.target.value })} />

            <CloseAndSaveButtons saveButton={saveButton} />

        </div>
        </div>
	)
  }

  export default NewProduc;

  
