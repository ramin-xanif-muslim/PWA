import { Col, Row, Switch, Select } from "antd";
import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Line, Pie, G2 } from "@ant-design/charts";
import { ConvertFixedTable } from "../functions";
import withLoading from "../HOC/withLoading";

function Dashboards(props) {
	const [data, setData] = useState();

	useEffect(() => {
		setData(props.data);
	}, [props.data]);
    
	return <div>{data && <Dashboad data={data} />}</div>;
}

export default withLoading(Dashboards, "dashboard");

function Dashboad(props) {
	const { data } = props;

	const { Option } = Select;
	function handleChange(value) {
		console.log(`selected ${value}`);
	}
	const allSum = () => {
		let allsum = 0;
		if (data) {
			console.log(data.Charts.Sales);
			data.Charts.Sales.map((s) => {
				allsum += Number(s.Amount);
			});
		}
		return allsum;
	};
	function percentFun(CurrAmount, PrevAmount) {
		let p = CurrAmount - PrevAmount;
		let result = p / PrevAmount;
		result *= 100;
		console.log(result);
		return result.toFixed(2);
	}

	let percentS;
	let percentP;
	let percentC;
	if (data) {
		percentS = percentFun(data.Sales.CurrAmount, data.Sales.PrevAmount);

		percentP = percentFun(data.Profits.CurrAmount, data.Profits.PrevAmount);
		percentC = percentFun(
			data.Comission.CurrAmount,
			data.Comission.PrevAmount
		);
	}

	return (
		<div id="dashboard" className={style.div}>
			<div className={style.dashboardHeader}>
				<h1>Göstəricilər</h1>
			</div>
			<Row>
				<Col xs={24} sm={24} md={24} xl={24}>
					<div className={style.statistic}>
						<div className={style.header}>
							<p className={style.name}>SATIŞLAR</p>
							<p className={style.date}>Bu gün</p>
						</div>
						<hr />
						<p className={style.amount}>
							₼{" "}
							{data
								? ConvertFixedTable(data.Sales.CurrAmount)
								: ""}
						</p>
						<div className={style.footer}>
							<span
								className={style.percent}
								style={
									percentP > -1
										? { color: "#00c900" }
										: { color: "#ff0000" }
								}
							>
								{percentS > -1 ? (
									<ArrowUpOutlined />
								) : (
									<ArrowDownOutlined />
								)}
								<p
									style={
										percentP > -1
											? { color: "#00c900" }
											: { color: "#ff0000" }
									}
								>
									{percentS}%
								</p>
							</span>
							<p className={style.ptext}></p>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} sm={24} md={24} xl={24}>
					<div className={style.statistic}>
						<div className={style.header}>
							<p className={style.name}>BORCLAR</p>
							<p className={style.date}>Bu gün</p>
						</div>
						<hr />
						<p className={style.amount}>
							<span>Borc (Alacaq):</span>{" "}
							{data
								? ConvertFixedTable(data.Settlements.Credit)
								: ""}{" "}
							₼
						</p>
						<p className={style.amount}>
							<span>Borc (Verəcək):</span>{" "}
							{data ? data.Settlements.Debt : ""} ₼
						</p>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} sm={24} md={24} xl={24}>
					<div className={style.statistic}>
						<div className={style.header}>
							<p className={style.name}>KOMİSYON SATIŞ</p>
							<p className={style.date}>Bu gün</p>
						</div>
						<hr />
						<p className={style.amount}>
							₼{" "}
							{data
								? ConvertFixedTable(data.Comission.Sales)
								: ""}
						</p>
						<div className={style.footer}>
							<span
								className={style.percent}
								style={
									percentC > -1
										? { color: "#00c900" }
										: { color: "#ff0000" }
								}
							>
								{percentC > -1 ? (
									<ArrowUpOutlined />
								) : (
									<ArrowDownOutlined />
								)}
								<p
									style={
										percentC > -1
											? { color: "#00c900" }
											: { color: "#ff0000" }
									}
								>
									{percentC}%
								</p>
							</span>
							<p className={style.ptext}></p>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} sm={24} md={24} xl={24}>
					<div className={style.statistic}>
						<div className={style.header}>
							<p className={style.name}>ANBAR QALIĞI</p>
							<p className={style.date}>Bu gün</p>
						</div>
						<hr />
						<p className={style.amount}>
							<span>Maya:</span>
							{data
								? ConvertFixedTable(data.StockedBalance.Amount)
								: ""}{" "}
							₼
						</p>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} sm={24} md={24} xl={24}>
					<div className={style.statistic}>
						<div className={style.header}>
							<p className={style.name}>MƏNFƏƏT</p>
							<p className={style.date}>Bu gün</p>
						</div>
						<hr />
						<p className={style.amount}>
							₼{" "}
							{data && ConvertFixedTable(data.Profits.CurrAmount)}
						</p>
						<div className={style.footer}>
							<span
								className={style.percent}
								style={
									percentP > -1
										? { color: "#00c900" }
										: { color: "#ff0000" }
								}
							>
								{percentP > -1 ? (
									<ArrowUpOutlined />
								) : (
									<ArrowDownOutlined />
								)}
								<p
									style={
										percentP > -1
											? { color: "#00c900" }
											: { color: "#ff0000" }
									}
								>
									{percentP}%
								</p>
							</span>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} sm={24} md={24} xl={24}>
					<div className={style.statistic}>
						<div className={style.header}>
							<p className={style.name}>ÖDƏNİŞLƏR</p>
							<p className={style.date}>Bu gün</p>
						</div>
						<hr />
						<p className={style.amount}>
							<span>Mədaxil:</span>
							{data && ConvertFixedTable(data.Payments.Payins)} ₼
						</p>
						<p className={style.amount}>
							<span>Məxaric:</span>
							{data && ConvertFixedTable(data.Payments.Payouts)} ₼
						</p>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} sm={24} md={24} xl={24}>
					<div className={style.statistic}>
						<div className={style.header}>
							<p className={style.name}>SİFARİŞLƏR</p>
							<p className={style.date}>Bu gün</p>
						</div>
						<hr />
						<p className={style.amount}>
							<span>Rezerv:</span>
							{data && ConvertFixedTable(data.Orders.Reserved)} ₼
						</p>
						<p className={style.amount}>
							<span>Hazırlanıb:</span>
							{data && ConvertFixedTable(data.Orders.Prepared)} ₼
						</p>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={24} sm={24} md={24} xl={24}>
					<div className={style.statistic}>
						<div className={style.header}>
							<p className={style.name}>KAPİTAL</p>
							<p className={style.date}>Bu gün</p>
						</div>
						<hr />
						<p className={style.amount}>
							<span>Məbləğ:</span>
							{data && ConvertFixedTable(data.Capital.Amount)} ₼
						</p>
					</div>
				</Col>
			</Row>
			<Row className={style.demoLineRow}>
				<Col className={style.col} xs={24} md={24} xl={24}>
					<div className={style.analiticHeader}>
						<div className={style.analiticSelectText}>
							<h2> QRAFİK</h2>
							<Select
								className={style.analiticSelect}
								defaultValue="1"
								onChange={handleChange}
							>
								<Option value="1">SATIŞ</Option>
								<Option value="2">MƏNFƏƏT</Option>
								<Option value="3">KAPİTAL</Option>
							</Select>
						</div>
						<div className={style.time}>
							<p>30 gün</p>
							<Switch className={style.switch} />
							<p>12 ay</p>
							<div className={style.profit}>
								<p className={style.bold}>{allSum()} ₼</p>
							</div>
						</div>
					</div>
					{data && <DemoLine charts={data.Charts} />}
				</Col>
			</Row>
			<Row>
				<Col className={style.col} xs={24} sm={24} md={24} xl={24}>
					<h2 style={{ margin: "auto" }}>BALANS</h2>
					{data && <DemoPie balances={data ? data.Balances : ""} />}
				</Col>
			</Row>
		</div>
	);
}

const DemoLine = ({ charts }) => {
	let data = charts.Sales.map((d) => ({
		year: d.Moment,
		Məbləğ: ConvertFixedTable(d.Amount),
	}));

	const config = {
		data,
		xField: "year",
		yField: "Məbləğ",
		label: {},
		point: {
			size: 5,
			shape: "diamond",
			style: {
				fill: "white",
				stroke: "#5B8FF9",
				lineWidth: 2,
			},
		},
		tooltip: {
			showMarkers: false,
		},
		state: {
			active: {
				style: {
					shadowBlur: 4,
					stroke: "#000",
					fill: "red",
				},
			},
		},
		interactions: [
			{
				type: "marker-active",
			},
		],
	};
	return <Line className={style.chart} {...config} />;
};

const DemoPie = (props) => {
	let balance =
		props.balances.Balance < 0 ? 0 : Math.abs(props.balances.Balance);
	let retailCashes =
		props.balances.RetailCashes < 0 ? 0 : props.balances.RetailCashes;
	let bankBalance =
		props.balances.BankBalance < 0 ? 0 : props.balances.BankBalance;
	const G = G2.getEngine("canvas");
	const data = [
		{
			type: "Sahibkar",
			value: balance,
		},
		{
			type: "Kassalar",
			value: retailCashes,
		},
		{
			type: "Hesab",
			value: bankBalance,
		},
	];
	const cfg = {
		appendPadding: 10,
		data,
		angleField: "value",
		colorField: "type",
		radius: 0.75,
		legend: false,
		label: {
			type: "spider",
			labelHeight: 40,
			formatter: (data, mappingData) => {
				const group = new G.Group({});
				group.addShape({
					type: "circle",
					attrs: {
						x: 0,
						y: 0,
						width: 40,
						height: 50,
						r: 5,
						fill: mappingData.color,
					},
				});
				group.addShape({
					type: "text",
					attrs: {
						x: 10,
						y: 8,
						text: `${data.type}`,
						fill: mappingData.color,
					},
				});
				group.addShape({
					type: "text",
					attrs: {
						x: 0,
						y: 35,
						text: `${data.value}₼ \n${(data.percent * 100).toFixed(
							2
						)}%`,
						fill: "rgba(0, 0, 0, 0.245)",
						fontWeight: 700,
					},
				});
				return group;
			},
		},
		interactions: [
			{
				type: "element-selected",
			},
			{
				type: "element-active",
			},
		],
	};
	const config = cfg;
	return <Pie {...config} />;
};
