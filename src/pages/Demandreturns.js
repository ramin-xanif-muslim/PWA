import React from "react";
import DocumentList from "../components/DocumentList";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";
import DocumentListFooter from "../components/DocumentListFooter";

function Supply(props) {
	// let navigate = useNavigate();
	// function handleClickOnPlusBtn() {
	//     navigate("/document");
	// }
	return (
		<div>
			<DocumentList list={props.data} />

			<DocumentListFooter
				// handleClickOnPlusBtn={handleClickOnPlusBtn}
				data={props.data}
			/>
		</div>
	);
}

export default withLoading(
	withSerchByDate(Supply, "demandreturns"),
	"demandreturns"
);
