import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../config/context';

function Document({ item, index }) {
	const { getDocumentsItem } = useGlobalContext();
	const { CustomerName, Name, Amount, Moment } = item;
	const onClick = () => {
		getDocumentsItem(item);
	};
	return (
		<Link key={Name} to="/document" style={{ color: "inherit" }}>
			<div className="demand" onClick={onClick}>
				<div className="index">
					<p>{index}</p>
				</div>
				<hr></hr>
				<div className="demand-inner">
					<div className="demand-text">
						<p className="name">{CustomerName}</p>
						<div>
							<p className="moment">{Moment}</p>
							<p className="no">№{Name}</p>
						</div>
					</div>
					<div className="demand-price">
						<p className="amount">
							{Math.round(Amount * 100) / 100}
							<sub>₼</sub>
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Document
