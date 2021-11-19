import React from 'react'
import { Link } from 'react-router-dom';
import MyInput from '../components/UI/input/MyInput';
import { useGlobalContext } from '../confiq/context';
import withLoading from '../HOC/withLoading';

function ChooseCustomerPage(props) {

    const [searchTerm, setSearchTerm] = React.useState("");
  
    const handleChange = e => {
      setSearchTerm(e.target.value);
    };
    const { getUser } = useGlobalContext()
  
    const sentIdUser = (Id) => {
      getUser(Id)
    }
  
      return (
          <div>
              <h2>Tərəf-müqabillər</h2>
        <MyInput
          type="text"
          placeholder="Teref mugabil axtarishi..."
          value={searchTerm}
          onChange={handleChange}
        />
              <ul>
                { props.data && props.data.List
                 ? props.data.List.filter((val) => {
                   if(searchTerm == '') {
                     return val
                   }else if(val.Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                     return val
                   }
                 }).map((item, index) => {
                  const {Id, Name} = item
                  return (
                    <div key={Id}>
                    <Link to='new_sales_document'>
                      <div onClick={() => sentIdUser(Id)} ><h2>{index + 1}.{Name} </h2></div>
                    </Link>
                    </div>
                  )
                  } )
                  : <p>Müştəri yoxdur</p>
                }
              </ul>
  
          </div>
      )
  }
  
  export default withLoading(ChooseCustomerPage,'customers')
  
