import React, { useState } from "react";
import Document from "../pages/Document";
import miniArrow_img from "../img/document_pages_img/mini-arrow.svg";

import { Col, Row, Tabs } from "antd";

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

function TabContends() {
	const [payment, setPayment] = useState();
	return (
		<Tabs className="doc-tabs" onChange={callback} type="card">
			<TabPane tab="ƏSAS" key="1">
				<Document payment={payment} />
			</TabPane>
			<TabPane tab="ÖDƏNİŞ" key="2">
				<Payment payment={payment} setPayment={setPayment} />
			</TabPane>
			{/* <TabPane tab="ƏLAQƏLİ SƏNƏDLƏR" key="3">
				Content of Tab Pane 3
			</TabPane> */}
		</Tabs>
	);
}

export default TabContends;

const Payment = (props) => {
	return (
		<div className="doc-form">

			<Row className="doc-form-row">
				<Col className="form-label" span={9}>
					<label>Məbləğ:</label>
				</Col>
				<Col className="form-input" span={12}>
					<input
						autoComplete="off"
						type="number"
						value={props.payment}
						onChange={(e) => props.setPayment(e.target.value)}
					/>
				</Col>
				<Col className="form-icons" span={3}>
					<img src={miniArrow_img} />
				</Col>
			</Row>
		</div>
	);
};
