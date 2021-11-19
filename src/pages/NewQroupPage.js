import React, {useState} from 'react'
import CloseAndSaveButtons from '../components/UI/button/CloseAndSaveButtons';
import MyInput from '../components/UI/input/MyInput';
import classes from '../components/UI/input/MyInput.module.css';
import MyLoading from '../components/UI/loading/MyLoading';
import MyTextarea from '../components/UI/textarea/MyTextarea';
import sendRequest from '../confiq/sentRequest';

function NewQroupPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState('')
    const [data, setData] = React.useState({
        GroupName: '',
        Group: '',
        Comment: '',
    })

    React.useEffect(() => {
        fetchProduct()
    },[])

    const fetchProduct = async () => {
        setIsLoading(true)
        const obj = { lm: 100 }
        let res = await sendRequest('productfolders/get.php',obj)
        setOptions(res.List)
        setIsLoading(false)
    }

    const saveButton = () => {
        sendRequest('productfolders/put.php',data)
        setData({
            GroupName: '',
            Group: '',
            Comment: '',
        })
    }

    if(isLoading) { return <MyLoading />}


    return (
        <div style={{marginTop: '30px'}}>
            <h1>Məhsul Qrupu</h1>
            <MyInput value={data.GroupName} type="text" placeholder='Qrupun adı' onChange={(e) => setData({...data, GroupName: e.target.value})} />
            <select onChange={(e) => setData({...data, Group: e.target.value})} className={`${classes.myInput} form-control form-control-lg`}>
              <option defaultValue>Qrup secin...</option>
              { options ? Object.values(options).map( option => 
              <option key={option.Id} value={option.Id}>{option.Name}</option>)
               : ''}
            </select>

            <MyTextarea value={data.Comment} onChange={(e) => setData({...data, Comment: e.target.value })} />

             <CloseAndSaveButtons saveButton={saveButton} />
        </div>
    )
}

export default NewQroupPage
