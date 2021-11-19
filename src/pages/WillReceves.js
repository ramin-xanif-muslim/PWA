import React from 'react'
import { useGlobalContext } from '../confiq/context'

function WillReceves() {
    const { willReceves } = useGlobalContext()
    const { CustomerName, Name, Moment, Amount } = willReceves
    console.log(willReceves)
    return (
        <div>
            <h2>{CustomerName}</h2>
            <h4>(Bağlı sənədlər)</h4>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                    <div style={{fontSize:'15px'}}>Satış</div>
                    <div style={{fontSize:'15px'}}>{Name}</div>
                    <div style={{fontSize:'15px'}}>{Moment}</div>
                </div>
                <div>
                    <div style={{fontSize:'15px'}}>Məbləğ:</div>
                    <div style={{fontSize:'15px'}}>{Amount}</div>
                </div>
            </div>
        </div>
    )
}

export default WillReceves
