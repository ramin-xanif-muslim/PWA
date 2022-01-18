import React from 'react'
import withLoading from '../HOC/withLoading'
import DocumentList from '../components/DocumentList'
import withSerchByDate from '../HOC/withSerchByDate'
import DocumentListFooter from '../components/DocumentListFooter'

function Documents(props) {


    return (
        <div>
		<div>
			<DocumentList list={props.data} from={props.from} />

			<DocumentListFooter {...props} />
		</div>
        </div>
    )
}

export default withLoading(
	withSerchByDate(Documents, "documents"),
	"documents"
);
