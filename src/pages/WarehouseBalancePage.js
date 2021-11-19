import React from 'react'
import { Link } from 'react-router-dom'
import MyInput from '../components/UI/input/MyInput'
import { useGlobalContext } from '../confiq/context'
import withLoading from '../HOC/withLoading'

function WarehouseBalancePage(props) {

    React.useEffect(() => {
        console.log(props.data)
    },[])

    const [searchTerm, setSearchTerm] = React.useState("");
  
    const handleChange = e => {
      setSearchTerm(e.target.value);
    };
    const { getProduct } =useGlobalContext()
  
    const sentIdProduct = (Id) => {
      getProduct(Id)
    }
  
      return (
          <div>
              <h2>Anbar qalığı</h2>
        <MyInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
              <ul>
                { props.data
                 ? props.data.List.filter((val) => {
                   if(searchTerm == '') {
                     return val
                   }else if(val.Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                     return val
                   }
                 }).map((item, index) => {
                  const {ProductId, ProductName} = item
                  return (
                    <div key={ProductId}>
                    <Link to='product'>
                      <div onClick={() => sentIdProduct(ProductId)} ><h2>{index + 1}.{ProductName} </h2></div>
                    </Link>
                    </div>
                  )
                  } )
                  : <p>Mehsullar yoxdur</p>
                }
              </ul>
  
          </div>
      )
  }
  
  export default withLoading(WarehouseBalancePage,'stockbalance')
