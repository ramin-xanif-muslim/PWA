import React, { useEffect, useState } from "react";
import save_img from "../img/document_pages_img/save.png";
import print_img from "../img/document_pages_img/print.png";
import close_img from "../img/document_pages_img/close.png";
import line_img from "../img/document_pages_img/line.svg";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../config/context";
import { Button, Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { ConvertFixedTable } from "../functions";

const DocFooter = ({
	products,
	isFooterOpen,
	setIsFoterOpen,
	saveButton,
	isChangeDocument,
}) => {
	let navigate = useNavigate();
	const { from, setIsNewDocument } = useGlobalContext();

	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [showWarningModal, setShowWarningModal] = useState(false);

	const computationPriceAndQuantity = () => {
		if (products && products[0]) {
			let tq = 0;
			let tp = 0;
			for (let i = 0; i < products.length; i++) {
				if (products && products[i]) {
					tq += Number(products[i].Quantity);
					tp += Number(products[i].Price) * Number(products[i].Quantity);
				}
			}
			setTotalQuantity(tq);
			setTotalPrice(tp);
		}
	};

	useEffect(() => {
		computationPriceAndQuantity();
	}, [products]);

	const closeDocument = () => {
		navigate(`/${from}`);
	};
	const onClose = (e) => {
		e.stopPropagation();
		if (isChangeDocument) {
			setShowWarningModal(true);
			// setIsCloseDocument(false);
		} else {
			navigate(`/${from}`);
			setIsNewDocument(false);
		}
	};

	return (
		<div
			style={from !== "demands" ? { bottom: 0 } : null}
			onClick={from === "demands" ? () => setIsFoterOpen(!isFooterOpen) : null}
			className={
				isFooterOpen ? "doc-footer doc-footer-open" : "doc-footer"
			}
		>
			{/* <div className="line">
				<img src={line_img} alt="" />
			</div> */}
			<div className="submit-buttons">
				<button className="close" onClick={(e) => onClose(e)}>
					<div>
						<img src={close_img} alt="" />
					</div>
					<p>Bağla</p>
				</button>
				<button
					className="print"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<div>
						<img src={print_img} alt="" />
					</div>
					<p>Print</p>
				</button>
				{isChangeDocument && (
					<button
						className="save"
						onClick={(e) => {
							e.stopPropagation();
							saveButton();
						}}
					>
						<div>
							<img src={save_img} alt="" />
						</div>
						<p>Yadda saxla</p>
					</button>
				)}
			</div>
			{from === "demands" ? (
				<div className="texts">
					<div className="text-block">
						<p className="text">Ümumi məbləğ:</p>
						<p className="number">{totalPrice.toFixed(2)}</p>
					</div>
					<div className="text-block">
						<p className="text">Endirim:</p>
						<p className="number"></p>
					</div>
					<div className="text-block-important">
						<p className="text">Yekun məbləğ:</p>
						<p className="number"></p>
					</div>
					<div className="text-block">
						<p className="text">Miqdar</p>
						<p className="number">{ConvertFixedTable(totalQuantity)}</p>
					</div>
					<div className="text-block">
						<p className="text">Mayası:</p>
						<p className="number"></p>
					</div>
					<div className="text-block">
						<p className="text">Qazanc:</p>
						<p className="number"></p>
					</div>
				</div>
			) : (
				<div className="texts">
					<div className="text-block-important">
						<p className="text">Yekun məbləğ:</p>
						<p className="number">{totalPrice.toFixed(2)}</p>
					</div>
					<div className="text-block">
						<p className="text">Miqdar</p>
						<p className="number">{ConvertFixedTable(totalQuantity)}</p>
					</div>
				</div>
			)}

			<Modal
				title={
					<div className="exitModalTitle">
						<WarningOutlined style={{ color: "#ffb300" }} /> Diqqət
					</div>
				}
				closable={false}
				className="close_doc_modal_wrapper"
				visible={showWarningModal}
				footer={[
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<div className="close_doc_modal_right_side">
							<Button
								key="back"
								onClick={() => setShowWarningModal(false)}
							>
								Geri qayıt
							</Button>
							<Button
								danger
								key="link"
								href="#"
								onClick={closeDocument}
							>
								Ok
							</Button>
						</div>
					</div>,
				]}
			>
				<p className="exitModalBodyText">
					Dəyişikliklər yadda saxlanılmayacaq
				</p>
			</Modal>
		</div>
	);
};

export default DocFooter;