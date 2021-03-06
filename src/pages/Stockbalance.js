import React from "react";
import DocumentList from "../components/DocumentList";
import DocumentListFooter from "../components/DocumentListFooter";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";

function Stockbalance(props) {
	return (
		<div>
			<DocumentList list={props.data} from={props.from} {...props} />

			{/* <DocumentListFooter {...props} /> */}
		</div>
	);
}

export default withLoading(
	withSerchByDate(Stockbalance, "stockbalance"),
	"stockbalance"
);
