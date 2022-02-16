import React, { useEffect, useState } from "react";
import MyForm from "../components/MyForm";
import ProductListForSelect from "../components/ProductListForSelect";
import MyLoading from "../components/UI/loading/MyLoading";
import MyModal from "../components/UI/modal/MyModal";
import { useGlobalContext } from "../config/context";
import DocFooter from "../components/DocFooter";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router";
import useRequest from "../hooks/useRequest";
import { message } from "antd";
import { Navigate } from "react-router";
import sendRequest from "../config/sentRequest";
import ok from "../audio/ok.mp3";
import { keysToLowerCase } from "../functions";
import { useConditionHandlingOnSave } from "../hooks/useConditionHandlingOnSave";

const audio = new Audio(ok);

const key = "updatable";

function Document() {
	let navigate = useNavigate();
	const { documentsItem, hideFooter, isNewDocument, from, setIsNewDocument } =
		useGlobalContext();
	const [products, setProducts] = useState([]);
	const [isFooterOpen, setIsFoterOpen] = useState(false);
	const [modalProductListForSelect, setModalProductListForSelect] =
		useState(false);
	const [formValues, setFormValues] = useState();
	const [isChangeDocument, setIsChangeDocument] = useState(false);

	useEffect(() => {
		if (isNewDocument) {
			hideFooter();
			setFormValues({ customername: null, stockname: null });
		}
		setIsChangeDocument(false);
	}, []);

	const responsePositions = useRequest(
		!isNewDocument ? from + "/get.php" : null,
		{ id: documentsItem.Id }
	);
	useEffect(() => {
		if (responsePositions.data) {
			setProducts(responsePositions.data.List[0].Positions);
			setIsChangeDocument(false);
		}
	}, [responsePositions.data]);

	const deleteProduct = () => {
		setProducts(products.filter((item) => item.Quantity !== 0));
	};

	const selectPrd = (arr) => {
        let filterArr = arr.filter((item) => item.Quantity) 
		setIsChangeDocument(true);
		let isNewBarcodeProductInProducts = false;
		let newarr = [];
		filterArr.map((a) => {
			products.forEach((p) => {
				if (p.BarCode === a.BarCode) {
					p.Quantity += a.Quantity;
					isNewBarcodeProductInProducts = true;
				}
			});
			if (!isNewBarcodeProductInProducts) {
				newarr.push(a);
			} else {
				isNewBarcodeProductInProducts = false;
			}
		});
		setProducts([...products, ...newarr]);
	};
	const getBarcodeProduct = (newBarcodeProduct) => {
		setIsChangeDocument(true);
		let isNewBarcodeProductInProducts = false;
		products.forEach((p) => {
			if (p.BarCode === newBarcodeProduct.BarCode) {
				p.Quantity += newBarcodeProduct.Quantity;
				isNewBarcodeProductInProducts = true;
			}
		});
		if (!isNewBarcodeProductInProducts) {
			setProducts([...products, newBarcodeProduct]);
		}
	};
	const getFormValues = (v) => {
		setIsChangeDocument(true);
		setFormValues(v);
	};

    const [conditionHandlingOnSave, conditionHandlingOnSaveEnterAndLossDocument] = useConditionHandlingOnSave(formValues)

	const saveButton = async () => {
        console.log(from)
        let isOk = false
        if(from === 'losses') { isOk = conditionHandlingOnSaveEnterAndLossDocument()}
        else if(from === 'enters') { isOk = conditionHandlingOnSaveEnterAndLossDocument()}
        else {isOk = conditionHandlingOnSave()}
        if (isOk) {
            message.loading({ content: "Loading...", key });
            let newArr = [];
            if (products[0]) {
            	newArr = products.map((item) => {
            		return {
            			ProductId: item.ProductId ? item.ProductId : item.Id,
            			Quantity: item.Quantity,
            			Price: item.Price,
            		};
            	});
            }
            formValues.positions = newArr;
            if (isNewDocument) {
            	let responseName = await sendRequest(from + "/newname.php", {
            		name: formValues.name ? formValues.name : "",
            	});
            	formValues.name = responseName.ResponseService;
            }
            let res = await sendRequest(
            	from + "/put.php",
            	keysToLowerCase(formValues)
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
            		Navigate(`/${from}`);
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
			<MyForm
				initialValues={isNewDocument ? null : documentsItem}
				getFormValues={getFormValues}
				setIsChangeDocument={setIsChangeDocument}
			/>

			{responsePositions.loading && <MyLoading />}

			<ProductList
				setIsChangeDocument={setIsChangeDocument}
				deleteProduct={deleteProduct}
				setModalProductListForSelect={setModalProductListForSelect}
				isFooterOpen={isFooterOpen}
				products={products}
				getBarcodeProduct={getBarcodeProduct}
			/>

			<MyModal
				style={{ width: "100%" }}
				visible={modalProductListForSelect}
				setVisible={setModalProductListForSelect}
			>
				<ProductListForSelect
					close={setModalProductListForSelect}
					selectPrd={selectPrd}
				/>
			</MyModal>
			<DocFooter
				products={products}
				isFooterOpen={isFooterOpen}
				setIsFoterOpen={setIsFoterOpen}
				saveButton={saveButton}
				isChangeDocument={isChangeDocument}
			/>
		</div>
	);
}

export default Document;
