import React from 'react'

{/* <MyTextarea value={data.Comment} onChange={(e) => setData({...data, Comment: e.target.value })} /> */}

function MyTextarea({...props}) {
    return (
        <textarea {...props} placeholder='Şərh' className="form-control" 
         id="exampleFormControlTextarea1" rows="3" style={{fontSize: '20px'}}/>
    )
}

export default MyTextarea
