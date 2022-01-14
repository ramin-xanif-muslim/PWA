import React from 'react'
import withLoading from '../HOC/withLoading'
import { useFetchDocuments } from '../hooks/useFetchDocuments'
import { useFetchDemands } from '../hooks/useFetchDemands'
import DocumentList from '../components/DocumentList'
import withSerchByDate from '../HOC/withSerchByDate'

function Documents(props) {


    return (
        <div>
        <DocumentList list={props.data} />
        </div>
    )
}

export default withLoading(
	withSerchByDate(Documents, "documents"),
	"documents"
);
