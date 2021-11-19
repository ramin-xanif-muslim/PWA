import React from "react";
import ContentButton from "../components/UI/button/ContentButton";
import {containerButtons} from '../confiq/data.js'

export default function NewPurchase() {
	return(
		 <div>
			 {containerButtons.newPurchase.map((data) => {
				 const {id, url, text, icon} = data;
				 return(
					<ContentButton key={id} id={id} url={url}
                    text={text} icon={icon} />
		 		 )
			 })}
		 </div>
	)
  }