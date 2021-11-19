import React from 'react'
import c from './Product.module.css'

function Product({item}) {
    const {CustomerName, Name, SpendName, Moment} = item
    return (
        <div className={c.content}>
            <div style={{display:'flex'}}>
                <div className={c.imgStyle}>
                    <img src='https://www.pngkey.com/png/full/299-2993445_manufacturing-products-product-icon-png-white.png' alt='prdct'/>
                </div>
                <div>
                    <p>{CustomerName}</p>
                    <p>{Name}</p>
                    <p>{SpendName}</p>
                    <div>{Moment}</div>
                </div>
            </div>
            <div>
                <p>Məxaric:</p>
                <p>0.00 ₼</p>
            </div>
        </div>
    )
}

export default Product
