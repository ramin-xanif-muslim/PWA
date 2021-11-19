import React from 'react'
import classes from '../input/MyInput.module.css';

//<MySelect defaultValue='...' options={options} onChange={onChangeSelect} value={selected}/>

    // const [selected, setSelected] = useState('')

//const onChangeSelect = (value) => {
//   setSelected(value)
//}

function MySelect({ options, defaultValue, onChange, value }) {
    return (
        <select class={`${classes.myInput} form-control form-control-lg`}
        value={value} onChange={e => onChange(e.target.value)}>
           <option defaultValue>{defaultValue}</option>
           { options ? options.map(option => {
               return <option value={option.Id} key={option.Id}>{option.Name}</option>
           })
        : ''}
        </select>
    )
}

export default MySelect