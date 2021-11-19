import React from 'react'
import Product from './Product'

function ProductsList({data}) {

    return (
        <div>
            { data ? data.map( item => {
              return <Product item={item} />
            }) : ''}
        </div>
    )
}

export default ProductsList
