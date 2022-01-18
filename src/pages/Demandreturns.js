import React from "react";
import DocumentList from "../components/DocumentList";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";
import DocumentListFooter from "../components/DocumentListFooter";

function Supply(props) {
	return (
		<div>
			<DocumentList list={props.data} from={props.from} />

			<DocumentListFooter {...props} />
		</div>
	);
}

export default withLoading(
	withSerchByDate(Supply, "demandreturns"),
	"demandreturns"
);
