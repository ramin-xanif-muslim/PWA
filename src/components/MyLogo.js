import React from "react";
import logo from '../logo.png';
import { Link } from 'react-router-dom';

export default function MyLogo() {
	return(
		 <div className='header'>
		   <Link to='/'>
		   <img src={logo} alt='Bein Sistem' />
		   </Link>
		 </div>
	)
  }
