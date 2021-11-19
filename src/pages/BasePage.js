import React from "react";
import ContentButton from "../components/UI/button/ContentButton";
import {containerButtons} from '../confiq/data.js'
import MyLogo from "../components/MyLogo";

export default function BasePage() {
	return(
		 <div>
			 <MyLogo />
			 {containerButtons.main.map((data) => {
				 const {id, url, text, icon} = data;
				 return(
					<ContentButton key={id} id={id} url={url}
                    text={text} icon={icon} />
				 )
			 })}
		 </div>
	)
  }
