import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import MySearchInput from '../components/UI/input/MySearchInput'
import MyLoading from '../components/UI/loading/MyLoading'
import MySelect from '../components/UI/select/MySelect'
import { useGlobalContext } from '../confiq/context'
import sendRequest from '../confiq/sentRequest'
import withLoading from '../HOC/withLoading'

function Debts(props) {
    const {getCustomerWillReceve} = useGlobalContext()
    const [data, setData] = useState('')
    const [willReceive, setWillReceive] = useState('')
    const [selected, setSelected] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(props.data && props.data.List) {
            setData(props.data.List)
        }
    }, [data])

    const onClick = (CustomerId,Customer) => {
        const feetchDocument = async () => {
            setIsLoading(true)
            let data = { cus: CustomerId, pg: 0}
            let res = await sendRequest('documents/get.php',data)
            getCustomerWillReceve(Customer)
            setWillReceive(res.List)
            setIsLoading(false)
            console.log('Customer',Customer)
        }
        feetchDocument()
    }
    let options = [
        {Id:0, Name:'Hamisi'},
        {Id:1, Name:'Alacaq'},
        {Id:2, Name:'Cixar(borc)'},
        {Id:3, Name:'Olmayanlar'},
        {Id:4, Name:'Olanlar'},
    ]
    const onChangeSelect = (value) => {
        setSelected(value)
        const data = { pg: 0, sr: 'CustomerName', dr: 1, zeros: value, }
        const fetchAlicilar = async () => {
            setIsLoading(true)
            let res = await sendRequest('settlements/get.php',data)
            setData(res.List)
            setIsLoading(false)
        }
        fetchAlicilar()
    }
    if(isLoading) {
        return <MyLoading />
    }
    return (
        <div>
            <MySearchInput />
            <MySelect 
               defaultValue='...'
               options={options}
               onChange={onChangeSelect}
               value={selected}
             />
             {
                 data 
                 ? 
                 data.map( item => {
                     return (
                         <div key={item.CustomerId}
                          style={{display:'flex',justifyContent:'space-between', margin:'10px',backgroundColor:'whitesmoke'}}>
                             <div>
                                 <div style={{fontSize:'13px'}}>{item.CustomerName}</div>
                                 <div style={{fontSize:'13px',color:'blue'}} onClick = {() => onClick(item.CustomerId,item)}>
                                     <Link to='/will_receves'>Alacaq</Link>
                                     </div>
                             </div>
                             <div>
                                 <div style={{fontSize:'13px'}}>Məbləğ:</div>
                                 <div style={{fontSize:'13px'}} >{item.Amount}</div>
                             </div>
                         </div>
                     )
                 })
                 : '' 
             }
        </div>
    )
}

export default withLoading(Debts,'settlements')
