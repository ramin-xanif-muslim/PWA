import React from "react";
import {
	ConvertFixedPositionInvoice,
	ConvertFixedPosition,
} from "../functions";
import { useEffect, useState } from "react";
import moment from "moment";
import { useMemo } from "react";
import sendRequest from "../config/sentRequest";
import { useGlobalContext } from "../config/context";
import "./Invoice.css";
import useRequest from "../hooks/useRequest";
export default function Invoice(props) {
	const [datas, setDatas] = useState(null);
	const [documentList, setDocumentList] = useState([]);
	const [info, setInfo] = useState(null);
	const [cusInfo, setCusInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [customerPhone, setCustomerPhone] = useState();

	const { hideFooter, hideHeader, print } = useGlobalContext();

	useEffect(() => {
		hideFooter();
		hideHeader();
		getCheckDatas();
	}, []);
    
    const company = useRequest('company/get.php',{})

	const columns = useMemo(() => {
		return [
			{
				title: "№",
				dataIndex: "Order",
				render: (text, record, index) => index + 1,
			},
			{
				dataIndex: "Name",
				title: "Malın adı",
			},
			{
				dataIndex: "BarCode",
				title: "Barkodu",
			},
			{
				dataIndex: "Unique",
				title: "Ölçü vahidi",
				render: (value, row, index) => {
					if (row.IsPack === 1) {
						return "paket";
					} else {
						return "əd";
					}
				},
			},
			{
				dataIndex: "Quantity",
				title: "Miqdar",
				render: (value, row, index) => {
					return ConvertFixedPositionInvoice(value);
				},
			},
			{
				dataIndex: "Price",
				title: "Qiymət",
				render: (value, row, index) => {
					return ConvertFixedPositionInvoice(value);
				},
			},
			{
				dataIndex: "TotalPrice",
				title: "Məbləğ",
				render: (value, row, index) => {
					return ConvertFixedPosition(row.Price * row.Quantity);
				},
			},
		];
	}, [datas, info]);

	const fetchCheck = async (url, id) => {
		let res = await sendRequest(url + "/get.php", { id: id });
		return res;
	};
	const fetchCustomersData = async (id) => {
		let res = await sendRequest("customers/getdata.php", { id: id });
		return res;
	};
	const fetchCustomersPhone = async (id) => {
		let res = await sendRequest("customers/get.php", { id: id });
		setCustomerPhone(res.List[0].Phone)
	};

	const getCheckDatas = async () => {
		const res = await fetchCheck(
			window.location.hash.slice(1),
			window.location.search.substring(1)
		);
		if (window.location.hash.slice(1)) {
			if (window.location.hash.slice(1) != "enters") {
				fetchCustomersPhone(res.List[0].CustomerId);
				const cus = await fetchCustomersData(res.List[0].CustomerId);
				setCusInfo(cus);
				setDatas(res.List[0]);
				setInfo(res);
				if (res.List[0]?.Positions) {
					const result = Object.values(res.List[0].Positions);
					setDocumentList(result);
				}
				setLoading(false);
				setTimeout(() => {
					window.print();
				}, 200);
			} else {
				setDatas(res.List[0]);
				setInfo(res);
				const result = Object.values(res.List[0].Positions);
				setDocumentList(result);
				setLoading(false);
                print()
				setTimeout(() => {
                    window.print();
				}, 200);
			}
		}
	};

	if (loading) return <div>Yüklənir...</div>;
	return (
		<div className="wrapper">
			<div className=" receipt receiptHeader">
				<p>
					Qaimə № <span id="invoiceNumber">{datas.Name}</span>{" "}
				</p>
			</div>

			<div className="company_info">
				<div className=" receipt receiptSeller">
					<div className="row">
						<div className="col-2">
							<div className="left_wrapper money">
								<p>Şirkət</p>
								<p className="seperator_innerp">:</p>
							</div>
						</div>
						<div className="col-10">
							<p className="ms-2">{company?.data?.CompanyName}</p>
						</div>
					</div>
				</div>
				<div className="receipt receiptSeller">
					<div className="row">
						<div className="col-2">
							<div className="left_wrapper money">
								<p>Telefon</p>
								<p className="seperator_innerp">:</p>
							</div>
						</div>
						<div className="col-10">
							<p className="ms-2">{company?.data?.Mobile}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="buyer_info">
				<div className="receipt receiptBuyer">
					<div className="row">
						<div className="col-2">
							<div className="left_wrapper money">
								<p>Alıcı</p>
								<p className="seperator_innerp">:</p>
							</div>
						</div>
						<div className="col-10">
							<p className="ms-2">{datas.CustomerName}</p>
						</div>
					</div>
				</div>
				<div className=" receipt receiptBuyer">
					<div className="row">
						<div className="col-2">
							<div className="left_wrapper money">
								<p>Telefon</p>
								<p className="seperator_innerp">:</p>
							</div>
						</div>
						<div className="col-10">
							<p className="ms-2">{customerPhone}</p>
						</div>
					</div>
				</div>
			</div>
			<div id="tabledemandresize" className="table-wrapper">
				<table style={{ width: "100%" }}>
					<thead>
						<tr>
							<th>№</th>
							<th>Adı</th>
							<th>Ölçü</th>
							<th>Miq</th>
							<th>Qİymət</th>
							<th>Məb</th>
						</tr>
					</thead>
					<tbody></tbody>
					<tfoot>
						{/* <?php $allSumPrice = 0; ?>
                        @foreach($sales as $sale)
                            @foreach($sale->Positions as $count => $position)
                                <?php $position = (array)$position; ?>
                                <?php $sumPrice = $position['Quantity'] * $position['Price']; ?>
                                <?php $allSumPrice += $sumPrice; ?>
                                <?php $position = (array)$position; ?>
                                <?php $sumPrice = $position['Quantity'] * $position['Price']; ?>
                                <?php $allSumPrice += $sumPrice; ?>
                                <tr>
                                    <th>{{ ++$count }}</th>
                                    <th>{{ $position['Name'] }}</th>
                                    <th>əd</th>
                                    <th>{{ $position['Quantity'] }}</th>
                                    <th>{{ $position['Price'] }}</th>
                                    <th>{{ $sumPrice }}</th>
                                </tr>
                            @endforeach
                        @endforeach */}
						<tr>
							<th></th>
							<th>
								<strong style={{ fontSize: "14px !important" }}>
									YEKUN
								</strong>
							</th>
							<th></th>
							<th></th>
							<th></th>
							<th
								style={{ fontSize: "14px !important" }}
								id="totalPriceDemand"
							>
								DATA
							</th>
						</tr>
					</tfoot>
				</table>
			</div>
			<div className="receipt receiptBuyer">
				<div className="row">
					<div className="col-3">
						<div className="left_wrapper money">
							<p>Son ödəmə</p>
							<p className="seperator_innerp">:</p>
						</div>
					</div>
					<div className="col-9">
						<p className="ms-2">
							{cusInfo
								? ConvertFixedPositionInvoice(
										cusInfo.LastTransaction
								  )
								: ""}{" "}
							{" ₼"}
						</p>
					</div>
				</div>
			</div>
			<div className=" receipt receiptBuyer mb-2">
				<div className="row">
					<div className="col-3">
						<div className="left_wrapper money">
							<p>Qalıq borc</p>
							<p className="seperator_innerp">:</p>
						</div>
					</div>
					<div className="col-9">
						<p className="ms-2">
							{cusInfo
								? ConvertFixedPositionInvoice(cusInfo.Debt)
								: ""}{" "}
							{" ₼"}
						</p>
					</div>
				</div>
			</div>
			<div className=" receipt receiptDate">
				<div className="row">
					<div className="col-3">
						<div className="left_wrapper money">
							<p>Tarix</p>
							<p className="seperator_innerp">:</p>
						</div>
					</div>
					<div className="col-9">
						<p className="ms-2">
							{moment().format("YYYY-MM-DD HH:mm")}
						</p>
					</div>
				</div>
			</div>
			<div className=" receipt recipient">
				<div className="row">
					<div className="col-3">
						<div className="left_wrapper money">
							<p>Təhvil verdi</p>
							<p className="seperator_innerp">:</p>
						</div>
					</div>
					<div className="col-9">
						<p className="ms-2">_______________</p>
					</div>
				</div>
			</div>
			<div className=" receipt recipient">
				<div className="row">
					<div className="col-3">
						<div className="left_wrapper money">
							<p>Təhvil aldı</p>
							<p className="seperator_innerp">:</p>
						</div>
					</div>
					<div className="col-9">
						<p className="ms-2">_______________</p>
					</div>
				</div>
			</div>
		</div>
	);
}
