import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../config/context";
import { ConvertFixedTable } from "../functions/index";

function Document(props) {
	const { item, index, from } = props;
	const { getDocumentsItem, putFrom } = useGlobalContext();
	const { CustomerName, Name, Amount, Moment, Id, Status } = item;
	const [isPermmision, setIPermision] = useState(false);
	const permission = [
		"supplies",
		"supplyreturns",
		"demands",
		"demandreturns",
		"enters",
		"losses",
	];

	useEffect(() => {
		let isLink = permission.includes(from);
		setIPermision(isLink);
	}, [from]);
	const onClick = () => {
		getDocumentsItem(item);
		putFrom(from);
	};

	if (from === "products") {
		return <DocumentForProduct {...props} onClick={onClick} />;
	}
	if (from === "transactions") {
		return <DocumentForTransactions {...props} onClick={onClick} />;
	}
	if (from === "stockbalance") {
		return <DocumentForStockbalance {...props} onClick={onClick} />;
	}
	if (from === "salereports") {
		return <DocumentForSalereports {...props} onClick={onClick} />;
	}
	if (from === "profit") {
		return <Profit {...props} />;
	}
	if (from === "cashes") {
		return <Cashes {...props} />;
	}
	if (from === "customers" || from === "salepoints") {
		return <DocumentForCustomers {...props} onClick={onClick} />;
	}

	return (
		<Link
			to={isPermmision ? "/document" : `/${from}`}
			style={{ color: "inherit" }}
		>
			<div
				className={Status === 1 ? "demand" : "demand demand-deactive"}
				onClick={onClick}
			>
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
}

export default Document;

const Cashes = (props) => {
	const { Name, Balance } = props.item;
	return (
		<div className="demand">
			<div className="index">
				<p>{props.index}</p>
			</div>
			<hr></hr>
			<div className="demand-inner">
				<div className="demand-text">
					<p className="name">{Name}</p>
				</div>
				<div className="demand-price">
					<p className="amount">
						{Math.round(Balance * 100) / 100}
						<sub>₼</sub>
					</p>
				</div>
			</div>
		</div>
	);
};
const Profit = (props) => {
	const { Name, Amount, Id } = props.item;
	const { CostSum, SaleSum } = props.allData;
	return (
		<div className="demand">
			<div className="index">
				<p></p>
			</div>
			<hr></hr>
			<div className="demand-inner">
				<div className="demand-text">
					<p className="name">{Name}</p>
				</div>
				<div className="demand-price">
					<p className="amount">
						{Math.round(Amount * 100) / 100}
						<sub>₼</sub>
					</p>
				</div>
			</div>
		</div>
	);
};
const DocumentForTransactions = ({ item, index, from, onClick }) => {
	const { CustomerName, Name, Amount, Moment, Id, Status } = item;
	return (
		<Link to="/document_transactions" style={{ color: "inherit" }}>
			<div
				className={Status === 1 ? "demand" : "demand demand-deactive"}
				onClick={onClick}
			>
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
const DocumentForProduct = ({ item, index, from, onClick }) => {
	const { BarCode, Name, Price, Moment, OwnerId } = item;
	return (
		<Link to="/document_product" style={{ color: "inherit" }}>
			<div className="demand" onClick={onClick}>
				<div className="index">
					<p>{index}</p>
				</div>
				<hr></hr>
				<div className="demand-inner">
					<div className="demand-text">
						<p className="name">{Name}</p>
						<div>
							<p className="no">№{BarCode}</p>
						</div>
					</div>
					<div className="demand-price">
						<p className="amount">
							{Price ? ConvertFixedTable(Price) : 0}
							<sub>₼</sub>
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
const DocumentForStockbalance = ({ item, index, from, onClick }) => {
	const { BarCode, ProductName, Quantity, Moment, OwnerId } = item;
	return (
		// <Link to="/document" style={{ color: "inherit" }}>
		<div className="demand" onClick={onClick}>
			<div className="index">
				<p>{index}</p>
			</div>
			<hr></hr>
			<div className="demand-inner">
				<div className="demand-text">
					<p className="name">{ProductName}</p>
					<div>
						<p className="no">№{BarCode}</p>
					</div>
				</div>
				<div className="demand-price">
					<p className="amount">Qalıq </p>
					<p className="amount">{ConvertFixedTable(Quantity)}</p>
				</div>
			</div>
		</div>
		// </Link>
	);
};
const DocumentForCustomers = ({ item, index, from, onClick }) => {
	const { BarCode, Name, Price, Moment, OwnerId } = item;
	return (
		<Link to="/document" style={{ color: "inherit" }}>
			<div className="demand" onClick={onClick}>
				<div className="index">
					<p>{index}</p>
				</div>
				<hr></hr>
				<div className="demand-inner">
					<div className="demand-text">
						<p className="name">{Name}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

const DocumentForSalereports = ({ item, index, from, onClick }) => {
	const { BarCode, ProductName, Quantity, SumPrice, Profit, SumCost } = item;
	return (
		<div className="demand" onClick={onClick}>
			<div className="index">
				<p>{index}</p>
			</div>
			<hr></hr>
			<div className="demand-inner">
				<div className="demand-text">
					<p className="name">{ProductName}</p>
					<div>
						<p className="no">{Quantity}</p>
					</div>
				</div>
				<div className="demand-price">
                <div>
					<p className="amount">Maya {ConvertFixedTable(SumCost)}</p></div>
					<p className="amount">Qazanc {ConvertFixedTable(Profit)}</p>
				</div>
			</div>
		</div>
	);
};
