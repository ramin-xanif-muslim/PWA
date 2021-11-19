import React from 'react'
import classes from './MyInput.module.css';

function MySelectInput({ options, defaultValue, value, onChange }) {
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

export default MySelectInput
