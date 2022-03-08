import { Button } from "antd";
import React, { useState } from "react";
import Document from "./Document";

function DocumentList({ list, from, getMoreData }) {
	const [isLoading, setIsLoading] = useState(false);
	const [count, setCount] = useState(99);
	const [page, setPage] = useState(1);
    
	const getMore = async () => {
		setIsLoading(true);
		await getMoreData(page);
		setPage(page + 1);
        setCount(count + 100)
		setIsLoading(false);
	};
	return (
		<div className="demands_wrapper">
			{list
				? list.map((item, index) => {
						return (
							<div key={index}>
								<Document
									item={item}
									index={index + 1}
									from={from}
								/>
								{index === count && (
									<Button loading={isLoading} className="doc-load-more-btn" onClick={getMore}>
										Daha çox ...
									</Button>
								)}
							</div>
						);
				  })
				: ""}
		</div>
	);
}

export default DocumentList;
