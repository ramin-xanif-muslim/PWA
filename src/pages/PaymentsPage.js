import React, {useEffect, useState} from 'react'
import ProductsList from '../components/ProductsList'
import MyInput from '../components/UI/input/MyInput'
import MySelect from '../components/UI/select/MySelect'
import withLoading from '../HOC/withLoading'

function PaymentsPage(props) {

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState("");

  useEffect(() => {
      if(props.data && props.data.List) {
          setProducts(props.data.List)
          console.log(props.data.List)
      }
  },[])

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  const optionsValue1 = [
        {Id:1, Name: 'Bu gun'},
        {Id:2, Name: 'Dunen'},
        {Id:3, Name: 'Bu ay'},
        {Id:4, Name: '30 gun'},
        {Id:5, Name: 'Muddetsiz'},
  ]
  const optionsValue2 = [
        {Id:1, Name: 'Hamisi'},
        {Id:2, Name: 'Medaxil'},
        {Id:3, Name: 'Mexaric'},
  ]
  const changeSelect1 = (value) => {
      console.log('changeSelect1',value)
  }
  const changeSelect2 = (value) => {
      console.log('changeSelect2',value)
  }

    return (
        <div>
            <h2>Ödənişlər</h2>
      <MyInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <div style={{display:'flex',justifyContent:'space-around'}}>
      <MySelect 
        defaultValue={''}
        options={optionsValue1}
        onChange={changeSelect1} />
      <MySelect 
        defaultValue={''}
        options={optionsValue2}
        onChange={changeSelect2} />
      </div>
      <ProductsList data={products} />
        </div>
    )
}

export default withLoading(PaymentsPage,'transactions')
