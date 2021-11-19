import React, { useState,useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import withLoading from '../HOC/withLoading'
import MyInput from './UI/input/MyInput'

const MyModal = (props) => {

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  const closeModal = () => {
    let arr = props.data.List.filter(p => p.checkedBox === true)
    props.selectPrd(arr)
    props.closeModal()
  }

  return <div className={`${props.isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay' }`}>
    <div className='modal-container'>
      <h3>Məhsullar</h3>
      <button className='close-modal-btn' onClick={closeModal}>
        <div style={{color:'blue'}}>OK</div>
      </button>
        <MyInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <hr style={{margin:'15px 0px'}} />
        <ul>
          { props.data
           ? props.data.List.filter((val) => {
             if(searchTerm == '') {
               return val
             }else if(val.Name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
               return val
             }
           }).map((item, index) => {
            const {Id, Name, Price} = item
            const handelCheckBox = (e) => {
                item.checkedBox = e.target.checked
            } 
            return (
            //   <div key={index} >
            //     <div style={{paddingTop:'5px', display:'inline-flex', width: '100%'}} >
            //       <div><input type='checkbox' 
            //        onChange={handelCheckBox} 
            //        /> </div>
            //       <div style={{marginLeft: '20px'}}><h2>{Id}.{Name} </h2></div>
            //     </div>
            //   </div>
              <div key={Id} >
                  <div className="indicator" >
                    <div>
                                <p>{index + 1}.{ Name }</p>
                    </div>
                    <div>
                                <p>Qiymet: {Price}</p>
                    </div> 
                    <div>
                        <input type='checkbox'  onChange={handelCheckBox} />
                    </div> 
                </div>
              </div>
            )
            } )
            : <p>Mehsullar yoxdur</p>
          }
        </ul>
    </div>
  </div>
}

export default withLoading(MyModal,'products')
