import React from "react";
import DocumentList from "../components/DocumentList";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";

function Supply(props) {
	return (
		<div>
			<DocumentList list={props.data} />
		</div>
	);
}

export default withLoading(withSerchByDate(Supply, "products"), "products");
