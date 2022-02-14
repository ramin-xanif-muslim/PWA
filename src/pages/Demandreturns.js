import React, { useEffect } from "react";
import DocumentList from "../components/DocumentList";
import withLoading from "../HOC/withLoading";
import withSerchByDate from "../HOC/withSerchByDate";
import DocumentListFooter from "../components/DocumentListFooter";
import { useGlobalContext } from "../config/context";

function Supply(props) {
    const { hideFooter } = useGlobalContext();
    useEffect(() => {
        hideFooter()
    },[])
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
