import React from 'react';
import { Link } from 'react-router-dom';
import c from './MyButton.module.css';

const ContentButton = ({id, url, text, icon}) => {
	return(
		  <div className={c.contendBtn}>
			<Link key={id} to={url}>
				<button className="btn btn-block btn-info">
					<div>{icon}</div>
					<div style={{fontSize: '20px'}}>{text}</div>
				</button>
			</Link>
		  </div>	
	)
  }

export default ContentButton;


