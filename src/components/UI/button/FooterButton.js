import React from "react";
import { Link } from "react-router-dom";
import {footerButtons} from '../../../confiq/data.js'

export default function FooterButton() {
    return(
    <div className='footer'>
      {footerButtons.map((data) => {
        let {id, text, url, icon} = data;
        return(
          <div key={id} className='footer-col'>
            <Link to={url}>
              <button className="btn btn-block btn-info">
				      	<div>{icon}</div>
				      	<div style={{fontSize:'15px'}}>{text}</div>
			      	</button>
            </Link>
          </div>
        )
      })}
      </div>
    )
}