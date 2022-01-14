import React from "react";
import DocumentList from "../components/DocumentList";
import DocumentListFooter from "../components/DocumentListFooter";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";

function Supply(props) {
	// let navigate = useNavigate();
	// function handleClickOnPlusBtn() {
	//     navigate("/document");
	// }
	return (
		<div>
			<DocumentList list={props.data} from="products" />

			<DocumentListFooter
				// handleClickOnPlusBtn={handleClickOnPlusBtn}
				data={props.data}
			/>
		</div>
	);
}

export default withLoading(withSerchByDate(Supply, "products"), "products");
