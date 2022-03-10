import React from "react";
import { Divider } from "antd";
import {
    ConvertFixedPositionInvoice,
    ConvertFixedPosition,
} from "../functions";
import { useEffect, useState } from "react";
import moment from "moment";
import { useMemo } from "react";
import { Table } from "antd";
import sendRequest from "../config/sentRequest";
import { useGlobalContext } from "../config/context";
export default function Invoice(props) {
    
    const [datas, setDatas] = useState(null);
    const [documentList, setDocumentList] = useState([]);
    const [info, setInfo] = useState(null);
    const [cusInfo, setCusInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const { hideFooter, hideHeader } = useGlobalContext();
    
    useEffect(() => {
        hideFooter()
        hideHeader()
        getCheckDatas();
    },[])

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
                    return ConvertFixedPositionInvoice(value)
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

    const fetchCheck = async (url,id) => {
        let res = await sendRequest(url + '/get.php',{id: id})
        return res
    }
    const fetchCustomersData = async (id) => {
        let res = await sendRequest('customers/getdata.php',{id: id})
        return res
    }

    const getCheckDatas = async () => {
        const res = await fetchCheck(
            window.location.hash.slice(1),
            window.location.search.substring(1)
        );
        console.log(res)
            if (window.location.hash.slice(1)) {
                if (window.location.hash.slice(1) != "enters") {
                    const cus = await fetchCustomersData(
                        res.List[0].CustomerId
                    );
                    console.log(cus)
                    setCusInfo(cus.Body);
                    setDatas(res.List[0]);
                    setInfo(res);
                    if(res.List[0]?.Positions) {
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
                    setTimeout(() => {
                        window.print();
                    }, 200);
                }
            }
    };

    if (loading) return <div>Yüklənir...</div>;
    return (
        <div className="invoice">
            {console.log(datas.Positions)}
            <div className="invoice_header">
                <h1 className="header_name">HESAB-FAKTURA</h1>
            </div>
            <div className="invoice_main_info">
                <div className="invoice_main_info_wrapper">
                    <div className="invoice_main_info_part number_wrapper">
                        <p>Hesab-faktura №:</p>
                        <p>{datas.Name}</p>
                    </div>
                    <div className="invoice_main_info_part date_wrapper">
                        <p>Tarix:</p>
                        <p>{moment().format("YYYY-MM-DD HH:mm")}</p>
                    </div>
                </div>
            </div>
            <Divider style={{ backgroundColor: "black" }} dashed={false} />
            <div className="invoice_supplier_part">
                <div className="invoice_main_info_part market cusnames">
                    <p>Mal göndərən :</p>
                    <p>
                        {window.location.hash.slice(1) === "supplies"
                            ? datas.CustomerName
                            : localStorage.getItem("companyname")}
                    </p>
                </div>
                <div className="invoice_main_info_part market">
                    <p>Ünvan :</p>
                    <p>...</p>
                </div>
                <div className="invoice_main_info_part market">
                    <p>Telefon :</p>
                    {/* <p>{JSON.parse(localStorage.getItem("company")).Mobile}</p> */}
                </div>
                <div className="invoice_main_info_part market">
                    <p>Bank rekvizitləri :</p>
                    <p>
                        {/* {props.location.hash.slice(1) === "supplies"
                            ? datas.Phone
                            : JSON.parse(localStorage.getItem("company"))
                                  .Mobile} */}
                    </p>

                    <p></p>
                </div>
            </div>
            <Divider style={{ backgroundColor: "black" }} dashed={false} />
            <div className="invoice_buyer_part">
                <div className="invoice_main_info_part market cusnames">
                    <p>Mal alan :</p>
                    <p>
                        {/* {props.location.hash.slice(1) === "supplies"
                            ? localStorage.getItem("companyname")
                            : datas.CustomerName} */}
                    </p>
                </div>
                <div className="invoice_main_info_part market">
                    <p>VÖEN :</p>
                    <p></p>
                </div>
                <div className="invoice_main_info_part market">
                    <p>Ünvan :</p>
                    <p></p>
                </div>
                <div className="invoice_main_info_part market">
                    <p>Telefon :</p>
                    <p>
                        {/* {props.location.hash.slice(1) === "supplies"
                            ? JSON.parse(localStorage.getItem("company")).Mobile
                            : datas.Phone} */}
                    </p>
                </div>
            </div>

            <Table
                rowKey="Id"
                className="invoicetable"
                columns={columns}
                dataSource={documentList}
                pagination={false}
                size="small"
            />
            <Divider className="total_price_divider">
                {String(datas.Amount).split(".")[0]} manat{" "}
                {String(datas.Amount).split(".")[1].slice(0,2)} qəp.
            </Divider>
            <div className="invoice_buyer_part">
                {window.location.hash.slice(1) != "enters" ? (
                    <>
                        <div className="invoice_main_info_part market customerinfo">
                            <p>Qalıq borc :</p>
                            <p>
                                {cusInfo ? ConvertFixedPositionInvoice(cusInfo.Debt) : ""}{" "}
                                {" ₼"}
                            </p>
                        </div>
                        <div className="invoice_main_info_part market customerinfo">
                            <p>Son ödəmə :</p>
                            <p>
                                {cusInfo ? ConvertFixedPositionInvoice(
                                    cusInfo.LastTransaction
                                ) : ''}{" "}
                                {" ₼"}
                            </p>
                        </div>
                    </>
                ) : null}

                <div className="invoice_main_info_part market customerinfo companyname">
                    <div className="firstCol cols">
                        {/* <p>{localStorage.getItem("companyname")} :</p> */}
                        <p>_____</p>
                    </div>
                    <div className="secondCol cols">
                        <p>Təhvil verdi :</p>
                        <p> _____</p>
                    </div>
                    <div className="thirdCol cols">
                        <p>Təhvil aldı :</p>
                        <p> _____</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
