import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import img_goback from "../img/GoBack.png";

function DocumentListFooter(props) {
	if (props.from === "stockbalance") {
		return <DocumentListFooterForStockbalance {...props} />;
	}
	if (props.from === "settlements") {
		return <DocumentListFooterForSettlements {...props} />;
	}
	if (props.from === "transactions" || props.from === "credittransactions") {
		return <DocumentListFooterForTransactions {...props} />;
	}
	if (props.from === "products") {
		return <DocumentListFooterForProduct {...props} />;
	}
	console.log(props);

	return (
		<div className="document-footer">
			<Row className="w-100">
				<Col xs={8} sm={8} md={8} xl={8}>
					<Link to="/">
						<img src={img_goback}></img>
					</Link>
				</Col>
				<Col xs={8} sm={8} md={8} xl={8}>
					<div className="create-button w-100">
						<button onClick={props.handleClickOnPlusBtn}>
							<p>+</p>
						</button>
					</div>
				</Col>
				<Col
					xs={8}
					sm={8}
					md={8}
					xl={8}
					className="d-flex align-items-center justify-content-end"
				>
					<p className="amount">
						{props.allData && props.allData.AllSum
							? props.allData.AllSum.toFixed(2)
							: ""}
					</p>
				</Col>
			</Row>
		</div>
	);
}

export default DocumentListFooter;

function DocumentListFooterForProduct(props) {
	return (
		<div className="document-footer">
			<div className="text">
					<Link to="/">
						<img src={img_goback}></img>
					</Link>
			</div>
			<div className="create-button">
				<button onClick={props.handleClickOnPlusBtn}>
					<p>+</p>
				</button>
			</div>
			<div className="number">
				{/* <p className="amount">
					{props.data && props.data.AllSum
						? props.data.AllSum.toFixed(2)
						: 0}
				</p>
				<p className="profit">
					{props.data && props.data.AllProfit
						? props.data.AllProfit.toFixed(2)
						: 0}
				</p> */}
			</div>
		</div>
	);
}
function DocumentListFooterForStockbalance(props) {
	return (
		<div className="document-footer">
			<Row className="w-100">
				<Col xs={8} sm={8} md={8} xl={8}>
					<Link to="/">
						<img src={img_goback}></img>
					</Link>
				</Col>
				<Col xs={8} sm={8} md={8} xl={8}>
					<div className="create-button w-100">
						<button onClick={props.handleClickOnPlusBtn}>
							<p>+</p>
						</button>
					</div>
				</Col>
				<Col xs={8} sm={8} md={8} xl={8}>
					<p className="amount">
						{props.data && props.data.CostSum
							? props.data.CostSum.toFixed(2)
							: 0}
					</p>
					<p className="profit">
						{props.data && props.data.QuantitySum
							? props.data.QuantitySum.toFixed(2)
							: 0}
					</p>
					<p className="profit">
						{props.data && props.data.SaleSum
							? props.data.SaleSum.toFixed(2)
							: 0}
					</p>
				</Col>
			</Row>
			{/* <div className="text">
				<p className="amount">X??rc m??bl????i</p>

				<p className="profit">K??miyy??t M??bl????</p>

				<p className="profit">Sat???? m??bl????i</p>
			</div>
			<div className="create-button">
				<button onClick={props.handleClickOnPlusBtn}>
					<p>+</p>
				</button>
			</div>
			<div className="number">
				<p className="amount">
					{props.data && props.data.CostSum
						? props.data.CostSum.toFixed(2)
						: 0}
				</p>
				<p className="profit">
					{props.data && props.data.QuantitySum
						? props.data.QuantitySum.toFixed(2)
						: 0}
				</p>
				<p className="profit">
					{props.data && props.data.SaleSum
						? props.data.SaleSum.toFixed(2)
						: 0}
				</p>
			</div> */}
		</div>
	);
}
function DocumentListFooterForSettlements(props) {
	return (
		<div className="document-footer">
			<div className="text">
				<p className="amount">M??bl????</p>

				<p className="profit">Borc (Alacaq)</p>

				<p className="profit">Borc (Ver??c??k)</p>
			</div>
			<div className="create-button">
				<button onClick={props.handleClickOnPlusBtn}>
					<p>+</p>
				</button>
			</div>
			<div className="number">
				<p className="amount">
					{props.data && props.data.AllSum
						? props.data.AllSum.toFixed(2)
						: 0}
				</p>
				<p className="profit">
					{props.data && props.data.AllOutSum
						? props.data.AllOutSum.toFixed(2)
						: 0}
				</p>
				<p className="profit">
					{props.data && props.data.AllInSum
						? props.data.AllInSum.toFixed(2)
						: 0}
				</p>
			</div>
		</div>
	);
}
function DocumentListFooterForTransactions(props) {
	return (
		<div className="document-footer">
			<div className="text">
				<p className="profit">M??daxil</p>

				<p className="profit">M??xaric</p>
			</div>
			<div className="create-button">
				<button onClick={props.handleClickOnPlusBtn}>
					<p>+</p>
				</button>
			</div>
			<div className="number">
				<p className="profit">
					{props.data && props.data.InSum
						? props.data.InSum.toFixed(2)
						: 0}
				</p>
				<p className="profit">
					{props.data && props.data.OutSum
						? props.data.OutSum.toFixed(2)
						: 0}
				</p>
			</div>
		</div>
	);
}
