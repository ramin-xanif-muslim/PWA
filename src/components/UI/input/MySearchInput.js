import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import MyInput from './MyInput'
import sendRequest from '../../../confiq/sentRequest';

function MySearchInput({ url, obj }) {
    const [ searchTerm, setSearchterm ] = React.useState('')

    useEffect(() => {
        console.log(searchTerm)
    },[searchTerm])
    const onChange = (item) => {
        setSearchterm(item)
    } 
    const search = async () => {
        let res = await sendRequest(url,obj)
        console.log(res)
    } 
    return (
        <div style={{display:'flex'}}>
            <input style={{width:'100%'}} value={searchTerm} onChange={e => onChange(e.target.value)}  type='text' />
            <button onClick={search} className="search-button"><FaSearch style={{fontSize:'20px'}} /></button>
        </div>
    )
}

export default MySearchInput
