import React, { useEffect } from "react";
import DocumentList from "../components/DocumentList";
import DocumentListFooter from "../components/DocumentListFooter";
import { useGlobalContext } from "../config/context";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";

function Supply(props) {
    const { hideFooter } = useGlobalContext();
    useEffect(() => {
        hideFooter()
    },[])
	return (
		<div>
			<DocumentList list={props.data} from={props.from} fetchData={props.fetchData} />

			<DocumentListFooter {...props} />
		</div>
	);
}

export default withLoading(withSerchByDate(Supply, "products"), "products");
