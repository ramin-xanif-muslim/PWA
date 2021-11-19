import React from 'react';
import { Link } from 'react-router-dom';
import {containerButtons} from '../../../data.js'
import c from './MyButton.module.css';

const ContainerButton = () => {
	return(
		 <div>
			 {containerButtons.map((data) => {
				 const {id, url, text, icon} = data;
				 return(
					<Link key={id} to={url}>
					<button className={c.contendBtn}>
						<div>{icon}</div>
						<div>{text}</div>
					</button>
					</Link>
				 )
			 })}
		 </div>
	)
  }

export default ContainerButton;


