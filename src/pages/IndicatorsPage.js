import React from "react";
import Indicator from "../components/Indicator";
import withLoading from "../HOC/withLoading";

function Indicators(props) {
  
	return(
		 <div>
             <h2 className="red-text text-center">Göstəricilər</h2>
             {props.data ?  <Indicator data={props.data} /> : '' }
		 </div>
	)
  }

  export default withLoading(Indicators,'dashboard')