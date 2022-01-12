import React from 'react'
import Document from './Document';

function DocumentList({ list }) {

	return (
		<div className="demands_wrapper">
			{list
				? list.List.map((item, index) => {
						return (
							<Document
								key={item.Name}
								item={item}
								index={index + 1}
							/>
						);
				  })
				: ""}
		</div>
	);
};

export default DocumentList
