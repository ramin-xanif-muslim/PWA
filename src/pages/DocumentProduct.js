import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";
import DocFooter from "../components/DocFooter";
import { message } from "antd";
import { keysToLowerCase } from "../functions/indexs";
import ok from "../audio/ok.mp3";
import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";

const audio = new Audio(ok);

function DocumentProduct() {
	let navigate = useNavigate();
	const { documentsItem, hideFooter, isNewDocument, from, setIsNewDocument } =
		useGlobalContext();
	const [products, setProducts] = useState([]);
	const [isFooterOpen, setIsFoterOpen] = useState(false);
	const [formValues, setFormValues] = useState();
	const [isChangeDocument, setIsChangeDocument] = useState(false);

	useEffect(() => {
		if (isNewDocument) {
			hideFooter();
			setFormValues({ customername: null, stockname: null });
		}
	}, []);

	const getFormValues = (v) => {
		setFormValues(keysToLowerCase(v));
	};
	const key = "updatable";

	const saveButton = async () => {
		if (!formValues.name) {
			message.warning({
				content: "Zəhmət olmasa, məhsulun adını qeyd edin!",
				key,
				duration: 2,
			});
		}
		if (!formValues.groupname) {
			message.warning({
				content: "Zəhmət olmasa, məhsulun qrupunu qeyd edin!",
				key,
				duration: 2,
			});
		}
		if (formValues.name && formValues.groupname) {
            message.loading({ content: "Loading...", key });
            let controller = from;
            let res = await sendRequest(controller + "/put.php", formValues);
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
	};
	if (!from) {
		navigate(`/`);
		return null;
	}
	return (
		<div className="document">
			<ProductForm
				initialValues={isNewDocument ? null : documentsItem}
				getFormValues={getFormValues}
				setIsChangeDocument={setIsChangeDocument}
			/>

			<DocFooter
				products={products}
				isFooterOpen={isFooterOpen}
				setIsFoterOpen={setIsFoterOpen}
				saveButton={saveButton}
				isChangeDocument={isChangeDocument}
				setIsChangeDocument={setIsChangeDocument}
			/>
		</div>
	);
}

export default DocumentProduct;
