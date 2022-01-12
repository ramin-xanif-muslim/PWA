import React from "react";
import "../styles/Demands.css";
import withLoading from "../HOC/withLoading";
import { useNavigate } from 'react-router';
import DemandsFooter from "../components/DemandsFooter";
import withSerchByDate from "../HOC/withSerchByDate";
import DocumentList from "../components/DocumentList";

function Demandreturns(props) {

	let navigate = useNavigate();
    function handleClickOnPlusBtn() {
        navigate("/document");
    }
	return (
		<div>

			<DocumentList list={props.data} />

            <DemandsFooter 
                handleClickOnPlusBtn={handleClickOnPlusBtn}
                data={props.data}
            />
		</div>
	);
}
export default withLoading(
    withSerchByDate(Demandreturns, "demandreturns"),
    "demandreturns"
    );

