import React from "react";
import { Link } from "react-router-dom";
import {footerButtons} from '../../../data.js'
import c from './MyButton.module.css';

export default function FooterButton() {
    return(
    <div className='footer'>
      {footerButtons.map((data) => {
        let {id, text, url, icon} = data;
        return(
          <div key={id} className='footer-col'>
            <Link to={url}>
            <button className={c.footerItem}>
              <div>{text}</div>
              <div>{icon}</div>
            </button>
            </Link>
          </div>
        )
      })}
      </div>
    )
}