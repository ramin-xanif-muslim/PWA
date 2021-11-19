import React,{ useState, useEffect} from 'react'
import { Redirect } from 'react-router';
import MyModal from '../components/MyModal';
import { useGlobalContext } from '../confiq/context';
import sendRequest from '../confiq/sentRequest';
import MyUIModal from '../components/UI/modal/MyModal';
import CloseAndSaveButtons from '../components/UI/button/CloseAndSaveButtons';
import MySelect from '../components/UI/select/MySelect';
import PlusMinus from '../components/UI/plusMinus.js/PlusMinus';

function NewSalesDocumentPage(props) {

    const { user, debt, createNewDemandObjCustomer, newDemandObjCustomer } = useGlobalContext()
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isModal2Open,setIsModal2Open] = useState(false)
    const [selectedProducts,setSelectedProducts] = useState([])
    const [showSelectedProducts,setShowSelectedProducts] = useState(false)
    const [ isClose, setIsClose] = useState(false)
    const [ stocks, setStocks ] = useState([])
    const [stockId, setStockId] = useState('')
    const [nameDocument, setNameDocument] = useState('')
    const [dataForUpdateModal, getDataForUpdateModal] = useState('')
    const [ time, setTime] = useState('')


	useEffect(() => {
		createNewDemandObjCustomer()
	}, [])
	useEffect(() => {
        fetchName()
	}, [nameDocument])
    useEffect(() => {
        setInterval(myTimer, 1000);
        function myTimer() {
          let d = new Date();
          let t = d.toLocaleTimeString();
          setTime(t)
        }
    }, [time])

    
    let today = new Date()
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' 
      + ' ' + time

    React.useEffect( async () => {
      let stocks = await sendRequest('stocks/get.php',{})
      setStocks(stocks.List)
    },[])
    const fetchName = async () => {
        let res = await sendRequest('demands/newname.php',{'n':''})
        setNameDocument(res.ResponseService)
    }

    const selectPrd = (arr) => {
        setSelectedProducts(arr)
    }
    const closeModal = () => {
        setIsModalOpen(false)
        setShowSelectedProducts(true)
    }
    const closeModal2 = () => {
        setIsModal2Open(false)
    }
    const saveButton =() => {
        if(user && user.Id) {
            let newArr = selectedProducts.map(item => {
                return { 
                    ProductId: item.ProductId,
                    Quantity: item.Quantity ? item.Quantity : 1,
                    Price: item.Price}
            })
            newDemandObjCustomer.positions = newArr
            newDemandObjCustomer.name = nameDocument
            newDemandObjCustomer.customerid = user.Id
            newDemandObjCustomer.moment = date
            newDemandObjCustomer.stockid = stockId
            let data = newDemandObjCustomer
            let fetchIdDocument = async () => {
                let res = await sendRequest('demands/put.php',data)
                newDemandObjCustomer.id = res.ResponseService
                if(newDemandObjCustomer.id) {
                    alert('Sened ugurla yaradildi')
                }
            }
            fetchIdDocument()
            console.log('newDemandObjCustomer',newDemandObjCustomer)
        }else setIsClose(true)
    }
    const getQuantity = async (data) => {
        selectedProducts.forEach(item => {
            if(item.ProductId === data.Id) {
                item.Quantity = data.Quantity
            }
        })
    }
    if(isClose) {
        return <Redirect to = '/choose_customer'/>
    }

    return (
        <div>
            <h2>Yeni satış sənədi</h2>
            <p style={{fontSize: '20px'}}>{date}</p>
            <div style={{fontSize: '20px'}}>Customer name: { user ? user.Name : '' }</div>
            <div><p style={{color: 'red',fontSize: '20px'}}>Qalıq borc:{debt}</p></div>

            <MySelect defaultValue='Anbar secin...' options={stocks} onChange={(e) => setStockId(e)} />

            <button onClick={() => {setIsModalOpen(true)}} style={{backgroundColor:'blue',fontSize:'20px'}}
                 >Məhsul əlavə et</button>

            <MyModal isModalOpen={isModalOpen}
              closeModal={closeModal} selectPrd={selectPrd} />

            { showSelectedProducts
             ?
              selectedProducts.map( item => { 
                const {Name, BarCode, Quantity, Id, Price} = item
                const onClick = () => {
                    setIsModal2Open(true)
                    getDataForUpdateModal(item)
                }  
                return (<div key={Id}  className="indicator" onClick={onClick}>
                    <div>
                                <p>{Name}</p>
                                <p>{BarCode}</p>
                    </div>
                    <div>
                        <p>{Quantity ? Quantity : '1 ' } eded</p>
                    </div>
                    <div>
                                <p>Qiymet:{Price}</p>
                                <p>Mebleg:{Quantity ? Quantity * Price : Price}</p>
                    </div> 
                </div>) }) 
             :
             <p>Mehsul secilmeyib</p>
            }

            <CloseAndSaveButtons saveButton={saveButton} />
            {/* <PlusMinus /> */}

            { isModal2Open 
            && <MyUIModal data={dataForUpdateModal} isModalOpen={isModal2Open}
                closeModal={closeModal2} getQuantity={getQuantity}/> }  

        </div>
    )
}

export default NewSalesDocumentPage