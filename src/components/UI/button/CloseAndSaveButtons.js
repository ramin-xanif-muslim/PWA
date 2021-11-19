import React from 'react'
import { FaRegTimesCircle, FaTelegramPlane } from 'react-icons/fa'
import { Redirect } from 'react-router'

function CloseAndSaveButtons({ saveButton, ...props }) {

    const [isClose,setIsClose] = React.useState(false)
        const closeButton = () => {
            if(window.confirm("Dəyişikliklər yadda saxlanılmayacaq!")) {setIsClose(true)}
            
        }

    if(isClose) {return <Redirect to='/'/>}
    
    return (
        <div {...props} style={{display:'flex', justifyContent:'space-between',marginTop:'10px'}} >
            <button onClick = {closeButton} style={{backgroundColor:'red',fontSize:'20px'}}
             ><FaRegTimesCircle />Bagla</button>
            <button style={{backgroundColor:'greenyellow',fontSize:'20px'}}
              onClick={saveButton}
             ><FaTelegramPlane />Yadda saxla</button>
        </div>
    )
}

export default CloseAndSaveButtons
