import React, { useEffect, useState } from "react";
import MyInput from "../components/UI/input/MyInput";
import sendRequest from "../confiq/sentRequest";
import { useGlobalContext } from "../confiq/context";
import classes from '../components/UI/input/MyInput.module.css';
import MyLoading from "../components/UI/loading/MyLoading";
import CloseAndSaveButtons from "../components/UI/button/CloseAndSaveButtons";
import MyCheckbox from "../components/UI/input/MyCheckbox";



export default function NewProduc() {

    const [options, setOptions] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [checkedCekili, setCheckedCekili] = React.useState(false);
    const [checkedArxiv, setCheckedArxiv] = React.useState(false);
  
    const handleChangeCheckboxCekili = () => {
        console.log(checkedCekili)
        setCheckedCekili(!checkedCekili);
    };
    const handleChangeCheckboxArxiv = () => {
        console.log(checkedArxiv)
        setCheckedArxiv(!checkedArxiv);
    };

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
          const res = await sendRequest('productfolders/get.php',{})
          setOptions(res.List)
          setIsLoading(false)
        }
        fetchData();
      }, []);

    const {product} = useGlobalContext()
    const productItems = product ? product.List[0] : ''
    const { Name, BarCode, BuyPrice, MinPrice, CostPrice, Price, Id} = productItems

    const [data, setData] = useState({
        name: '',
        Barkod: '',
        Artkod: '',
        GrupSecin: '',
        AlishGiymeti: '',
        MinimumQiymet: '',
        SatishGiymeti: '',
        MayaGiymeti: '',
    })

    useEffect(() => {
        setData({
            ...data,
            name: Name,
            Barkod: BarCode,
            AlishGiymeti: BuyPrice,
            MinimumQiymet: MinPrice,
            SatishGiymeti: CostPrice,
            MayaGiymeti: Price,
        })
    },[Name])

    const saveButton = async () => {
        await sendRequest('products/update.php',data)
    }

    if(isLoading) {
        return <MyLoading />
    }

	return(
        <div>
            <h2 className="red-text text-center">Məhsul</h2>
        <div>
            <MyInput type="text" placeholder='Ad' value={data.name} onChange={(e) => setData({...data,name: e.target.value})} /> 

             <MyInput disabled style={{borderRadius: "0 0.3rem 0.3rem 0"}} placeholder='Barkod' type='text'name='Barkod'
              value={data.Barkod} onChange={(e) => setData({...data,Barkod: e.target.value})} />
                
            <MyInput type='text' placeholder='Artkod' value={data.Artkod} onChange={(e) => setData({...data,Artkod: e.target.value})} />  

        <select onChange={(e) => setData({...data,GrupSecin: e.target.value})}
         className={`${classes.myInput} form-control form-control-lg`}>
           <option defaultValue="Qrup">Qrup secin...</option>
           { options ? Object.values(options).map( option => 
                <option value={option.Id} key={option.Id}>{option.Name}</option>)
            : ''}
        </select>
                
            <MyInput type='text' placeholder='Alish giymeti' name='AlishGiymeti' value={data.AlishGiymeti} onChange={(e) => setData({...data,AlishGiymeti: e.target.value})} />  
                
            <MyInput type='text' placeholder='Minimum qiymet' name='MinimumQiymet' value={data.MinimumQiymet} onChange={(e) => setData({...data,MinimumQiymet: e.target.value})} />  
                
            <MyInput type='text' placeholder='Satish giymeti' name='SatishGiymeti' value={data.SatishGiymeti} onChange={(e) => setData({...data,SatishGiymeti: e.target.value})} />  
                
            <MyInput type='text' placeholder='Maya giymeti' name='MayaGiymeti' value={data.MayaGiymeti} onChange={(e) => setData({...data,MayaGiymeti: e.target.value})} />  
            
            <div style={{display:'flex',justifyContent:'center'}} >
               <MyCheckbox
                label="Çəkili"
                value={checkedCekili}
                 onChange={handleChangeCheckboxCekili}
               />
               <MyCheckbox
                label="Arxiv"
                value={checkedArxiv}
                onChange={handleChangeCheckboxArxiv}
               />
            </div>    

            <CloseAndSaveButtons saveButton={saveButton} />

        </div>
        </div>
	)
  }