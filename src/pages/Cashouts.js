import React from "react";
import "../styles/Demands.css";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";
import DocumentList from "../components/DocumentList";
import DocumentListFooter from "../components/DocumentListFooter";

function Cashouts(props) {
	return (
		<div>
			<DocumentList list={props.data} from={props.from} />

			<DocumentListFooter {...props} />
		</div>
	);
}
export default withLoading(withSerchByDate(Cashouts, "cashouts"), "cashouts");
