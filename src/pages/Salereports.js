import React from "react";
import DocumentList from "../components/DocumentList";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";

function Salereports(props) {
	return (
		<div>
			<DocumentList list={props.data} from={props.from} {...props} />
		</div>
	);
}

export default withLoading(
	withSerchByDate(Salereports, "salereports"),
	"salereports"
);
