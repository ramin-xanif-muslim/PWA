import React from "react";
import DocumentList from "../components/DocumentList";
import DocumentListFooter from "../components/DocumentListFooter";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";

function Cashins(props) {
	return (
		<div>
			<DocumentList list={props.data} from={props.from} />

			<DocumentListFooter {...props} />
		</div>
	);
}

export default withLoading(withSerchByDate(Cashins, "cashins"), "cashins");
