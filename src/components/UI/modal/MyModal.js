import React, { useEffect, useState } from 'react'
import c from './MyModal.module.css';
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";

function MyUIModal(props) {
    const [eded,setEded] = useState(1)
    const [mebleg,setMebleg] = useState(0)
    const [endirim,setEndirim] = useState(0)
    useEffect(() => {
        if(eded < 1) {
            setEded(1)
        }
    }, [eded])
    useEffect(() => {
        setMebleg(props.data.Price * eded)
    }, [eded,endirim])
    useEffect(() => {
      setEded(props.data.Quantity ? props.data.Quantity : 1)
    },[])
    const closeModal = () => {
      let data = {Quantity: eded, Id: props.data.ProductId}
      props.getQuantity(data)
      props.closeModal()
    }
    return <div className={`${props.isModalOpen ? c.modalOverlay + ' ' + c.showModal : c.modalOverlay }`}>
      <div className={c.modalContainer}>
        <h3>{props.data.Name}</h3>
        <button className={c.closeModalBtn} onClick={closeModal}>
          <p style={{color: 'blue', fontSize:'20px'}} >OK</p>
        </button>
        <hr/>
        <div style={{paddingBottom:'10px'}}>
            <label style={{paddingRight:'10px'}} >Qiymet: <input readOnly value={props.data.Price} style={{fontSize:'30px',height:'60px',width:'100px'}} type='number' /></label>
            <label>Mebleg: <input readOnly value={mebleg} style={{fontSize:'30px',height:'60px',width:'100px'}} type='number' /></label>
        </div>
        {/* <div>
            <button onClick={() => setEndirim(endirim - 1)} style={{fontSize:'30px',backgroundColor:'greenyellow'}}><GrFormSubtract/></button>
            <input value={endirim} min='0'
             style={{fontSize:'30px',height:'60px',width:'100px', marginLeft: '80px', border:'none'}} 
             type='number'/>
            <button onClick={() => setEndirim(endirim + 1)} style={{fontSize:'30px',backgroundColor:'greenyellow'}}><GrFormAdd/></button>
        </div>
            <p>Endirim % </p> */}
        <div style={{ display: 'flex' }}>
            <button onClick={() => setEded(eded - 1)} style={{fontSize:'30px',backgroundColor:'greenyellow'}}><GrFormSubtract/></button>
            <input value={eded} min='0' onChange={(e) => setEded(e.target.value)}
             style={{textAlign: 'center',fontSize:'30px',height:'60px',width:'100%', border:'none'}} 
             type='number'/>
            <button onClick={() => setEded(eded + 1)} style={{fontSize:'30px',backgroundColor:'greenyellow'}}><GrFormAdd/></button>
        </div>
            <p>Eded:</p>
      </div>
    </div>
  }

export default MyUIModal
