import React from 'react';
import c from './MyButton.module.css';

const MyButton = ({children, ...props}) => {
    return (
        <button id="inputID"  style={{marginBottom: '10px', fontSize:'20px'}} {...props} className={c.btn}>
            {children}
        </button>
    );
};

export default MyButton;