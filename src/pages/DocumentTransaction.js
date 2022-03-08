import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";
import DocFooter from "../components/DocFooter";
import { message } from "antd";
import { keysToLowerCase } from "../functions/index";
import ok from "../audio/ok.mp3";
import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import style from "./DocumentProduct.module.css";
import TransactionForm from "../components/TransactionForm";

const audio = new Audio(ok);

function DocumentTransaction() {
	let navigate = useNavigate();
	const { documentsItem, hideFooter, isNewDocument, from, setIsNewDocument } =
		useGlobalContext();
	const [isFooterOpen, setIsFoterOpen] = useState(false);
	const [formValues, setFormValues] = useState();
	const [isChangeDocument, setIsChangeDocument] = useState(false);
	const [endPoint, setEndPoint] = useState();

	useEffect(() => {
		if (isNewDocument) {
			hideFooter();
		}
	}, []);
	useEffect(() => {
		if (formValues && formValues.typename === "Nağd mədaxil")
			setEndPoint("paymentins");
		else if (formValues && formValues.typename === "Nağdsız mədaxil")
			setEndPoint("invoiceins");
		else if (formValues && formValues.typename === "Nağd məxaric")
			setEndPoint("paymentouts");
		else if (formValues && formValues.typename === "Nağdsız məxaric")
			setEndPoint("invoiceouts");
	}, [formValues?.typename]);

	const getFormValues = (v) => {
		setFormValues(keysToLowerCase(v));
	};
	const key = "updatable";

	const saveButton = async () => {
		console.log(formValues.typename);
		if (!formValues.customername) {
			message.warning({
				content: "Zəhmət olmasa, qarşı-tərəfi qeyd edin!",
				key,
				duration: 2,
			});
		} else if (!formValues.spendname) {
			message.warning({
				content: "Zəhmət olmasa, xərc maddəsini qeyd edin!",
				key,
				duration: 2,
			});
		} else {
			message.loading({ content: "Loading...", key });
			try {
				if (isNewDocument && endPoint) {
					console.log("111");
					let responseName = await sendRequest(
						endPoint + "/newname.php",
						{
							name: formValues.name ? formValues.name : "",
						}
					);
					formValues.name = responseName.ResponseService;
				}
			} finally {
				if (endPoint) {
					console.log("222");
					let res = await sendRequest(
						endPoint + "/put.php",
						formValues
					);
					if (res.ResponseStatus === "0") {
						message.success({
							content: "Dəyişikliklər yadda saxlanıldı!",
							key,
							duration: 2,
						});
						audio.play();
						setIsChangeDocument(false);
						if (isNewDocument) {
							navigate(`/${from}`);
							setIsNewDocument(false);
						}
					}
				}
			}
		}
	};
	if (!from) {
		navigate("/");
		return null;
	}
	return (
		<div className={style.document}>
			<TransactionForm
				initialValues={isNewDocument ? null : documentsItem}
				getFormValues={getFormValues}
				setIsChangeDocument={setIsChangeDocument}
			/>

			<DocFooter
				isFooterOpen={isFooterOpen}
				setIsFoterOpen={setIsFoterOpen}
				saveButton={saveButton}
				isChangeDocument={isChangeDocument}
			/>
		</div>
	);
}

export default DocumentTransaction;
