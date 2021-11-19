import React from 'react'

{/* <MyCheckbox
  label="My Value"
  value={checked}
  onChange={handleChange}
/> */}

function MyCheckbox({ label, value, onChange }) {
    return (
        <div>
            <input style={{marginTop: '10px', marginLeft: '20px'}} type="checkbox" checked={value} onChange={onChange} />
            <span style={{marginTop: '10px', marginLeft: '20px', fontSize: '20px'}} className="checkboxtext">
              {label}
            </span>
        </div>
    )
}
// const MyCheckbox = ({ label, value, onChange }) => {
//   return (
//     <label style={{marginTop: '10px', marginLeft: '20px', fontSize: '20px'}}>
//       <input style={{marginTop: '10px', marginLeft: '20px'}} type="checkbox" checked={value} onChange={onChange} />
//       {label}
//     </label>
//   );
// };

export default MyCheckbox
