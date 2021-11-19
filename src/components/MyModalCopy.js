import React, { useState,useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'
import withLoading from '../HOC/withLoading'
import MyInput from './UI/input/MyInput'

const MyModal = (props) => {

  const [searchTerm, setSearchTerm] = React.useState("");
  const [isQuantityModal, setIsQuantityModal] = React.useState(false);

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
            const {Name, BarCode, Quantity, Id, Price} = item
            const onClick = () => {
                console.log('aaa')
                setIsQuantityModal(true)
                // setIsModal2Open(true)
                // getDataForUpdateModal(item)
            }  
            const handelCheckBox = (e) => {
                item.checkedBox = e.target.checked
            } 
            const closeQuantityModal = () => {
                console.log('close')
                setIsQuantityModal(false)
            } 
            return (
              <div key={index} onClick={() => setIsQuantityModal(true)} >
                  <div className="indicator" onClick={onClick}>
                    <div>
                                <p>{ Name }</p>
                    </div>
                    <div>
                                <p>Qiymet: {Price}</p>
                    </div> 
                    <div>
                        <p> {Quantity ? `${Quantity} eded`  : '' }</p>
                    </div>
                    <div>
                        <input type='checkbox'  onChange={handelCheckBox} />
                    </div> 
                </div>
                { isQuantityModal && <GuantityModal isQuantityModal={isQuantityModal}
                  closeQuantityModal={closeQuantityModal} />}
              </div>
            )
            } )
            : <p>Mehsullar yoxdur</p>
          }
        </ul>
    </div>
  </div>
}
const GuantityModal = (props) => {
    const [eded,setEded] = useState(1)
    const closeModal = () => {
        console.log('close')
        props.closeQuantityModal()
    }
    return (
        <div className={`${props.isQuantityModal ? 'modal-overlay show-modal' : 'modal-overlay' }`} >
            <div className='modal-container'>
                <h3>Məhsullar</h3>
                <button className='close-modal-btn' onClick={closeModal}>
                    <div style={{color:'blue'}}>OK</div>
                </button>
        <div style={{ display: 'flex',paddingTop: '10px' }}>
            <button onClick={() => setEded(eded - 1)} style={{fontSize:'30px',backgroundColor:'greenyellow'}}><GrFormSubtract/></button>
            <input value={eded} min='0' 
             style={{textAlign: 'center',fontSize:'30px',height:'60px',width:'100%', border:'none'}} 
             type='number'/>
            <button onClick={() => setEded(eded + 1)} style={{fontSize:'30px',backgroundColor:'greenyellow'}}><GrFormAdd/></button>
        </div>
            <p>Eded:</p>

            </div>
        </div>
    )
}

export default withLoading(MyModal,'products')
