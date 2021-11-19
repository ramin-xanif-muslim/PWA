import React, { useState, useEffect } from "react";
import MyInput from "../components/UI/input/MyInput";
import sendRequest from "../confiq/sentRequest";
import MyLoading from "../components/UI/loading/MyLoading";
import CloseAndSaveButtons from "../components/UI/button/CloseAndSaveButtons";
import MySelectInput from "../components/UI/input/MySelectInput";
import MyTextarea from "../components/UI/textarea/MyTextarea";



export default function IncomePage() {

    const [data, setData] = useState({
        MehsulAlinmasi: '',
        customerid: '',
        amount: '',
        description: '',
        name: '',
        moment: '',
    })
    const [spenditems,setSpenditems] = useState('')
    const [customers,setCustomers] = useState('')
    const [debt,setDebt] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const [time,setTime] = useState('')

    const fetchName = async () => {
        setIsLoading(true)
        let res = await sendRequest('paymentins/newname.php',{})
        setData({...data,name: res.ResponseService})
        setIsLoading(false)
    } 

      useEffect(() => {
        let today = new Date()
        let t = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' 
          + ' ' + today.getHours() + ':' + today.getMinutes()
        setTime(t)
        fetchName()
      }, [])

    useEffect( async () => {
        setIsLoading(true)
        let res = await sendRequest('spenditems/get.php',{})
        setSpenditems(res.List)
        getCustomers()
        setIsLoading(false)
    },[])
    useEffect(async () => {
        setIsLoading(true)
        let d = {id: data.customerid}
        let res = await sendRequest('customers/getdata.php',d)
        setDebt(res.Debt)
        setIsLoading(false)
    }, [data.customerid])

    const getCustomers = async () => {
        let data = {lm: 100, pg: 0, nm:'', gp: '' }
        let res = await sendRequest('customers/get.php',data)
        setCustomers(res.List)
    }

    const saveButton = () => {
        if( data.customerid ){
        const fun = async () => {
            let res = await sendRequest('paymentins/put.php',data)
            console.log(res.ResponseService)
            alert('Mexsul eleve olundu.')
        }
        fun()
        setData({...data,moment: time})
        }else alert('write somfinc')
    }
    if(isLoading) {
        return <MyLoading />
    }

	return(
        <div>
            <h2 className="red-text text-center">Məxaric</h2>
        <div>
            <MySelectInput defaultValue='...' options={spenditems} />
            <MySelectInput defaultValue='Teref mugabil adi' options={customers} />
            {
                data.customerid && <p style={{color:'red',fontSize:'20px',display:'flex'}}> Qalıq borc:{debt}</p> 
            }
            
            <MyInput id="inputID" type='number' placeholder='Mebleg' value={data.amount}
             onChange={(e) => setData({...data,amount: e.target.value})} />

            <MyTextarea value={data.description} onChange={(e) => setData({...data, description: e.target.value })} />

            <CloseAndSaveButtons saveButton={saveButton} />
              
        </div>
        </div>
	)
  }