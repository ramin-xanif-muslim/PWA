import React,{useState, useEffect} from 'react'
import MySearchInput from '../components/UI/input/MySearchInput';
import MySelect from '../components/UI/select/MySelect';
import sendRequest from '../confiq/sentRequest';
import withLoading from '../HOC/withLoading';

function SalesDocumentsPage() {
    
    const [searchTerm, setSearchTerm] = useState('')
    const [selected, setSelected] = useState('')
    const [momb, setMomb] = useState('')
    const [mome, setMome] = useState('')
    const url = 'demands/get.php'
    const obj = {
        pg: 0,
        nm: searchTerm,
        dr: 1, 
        sr: 'Name',
        momb: momb,
        mome: mome,
    }
    let today = new Date()
    let y = today.getFullYear()
    let m = today.getMonth()
    let d = today.getDate()
    // let date = y + '/' + (m + 1) + '/' + d

    useEffect(() => {
        console.log(obj)
    }, [selected])  

    const options = [
        { Id: 1, Name: 'Bu gun'},
        { Id: 2, Name: 'Dunen'},
        { Id: 3, Name: 'Bu ay'},
        { Id: 4, Name: '30 gun'},
        { Id: 5, Name: 'Muddetsiz'},
    ]
    const getSearchTerm = (st) => {
        setSearchTerm(st)
    }
    const fetchDemands = async () => {
        let res = sendRequest('demands/get.php',obj)
    } 
    const onChange = (i) => {
        setSelected(i)
        if(i == 1) {
            let date = y + '/' + (m + 1) + '/' + d
            setMomb(`${date} 00:00`)
            setMome(`${date} 23:59`)
            return
        }
        if(i == 2) {
            d = d - 1
            let date = y + '/' + (m + 1) + '/' + d
            setMomb(`${date} 00:00`)
            setMome(`${date} 23:59`)
            return
        }
        if(i == 3) {
            d = 1
            let date = y + '/' + (m + 1) + '/' + d
            setMomb(`${date} 00:00`)
            d = 30
            date = y + '/' + (m + 1) + '/' + d
            setMome(`${date} 23:59`)
            return
        }
        if(i == 4) {
            let date = y + '/' + m + '/' + d
            setMomb(`${date} 00:00`)
            setMome(`${date} 23:59`)
            return
        }
        if(i == 5) {
            setMomb(``)
            setMome(``)
            return
        }
        console.log(i)
    }
    return (
        <div>
            <h1>Satış sənədləri siyahısı</h1>
            <MySearchInput getSearchTerm={getSearchTerm} url={url} obj={obj} />
            <div>
                <div>Tarix</div>
                <div>
                    <MySelect
                        defaultValue="Tarix"
                        options={options}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default withLoading(SalesDocumentsPage,'demands')
