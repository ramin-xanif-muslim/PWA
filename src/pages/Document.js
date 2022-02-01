import React, { useEffect, useState } from "react";
import MyForm from "../components/MyForm";
import ProductListForSelect from "../components/ProductListForSelect";
import MyLoading from "../components/UI/loading/MyLoading";
import MyModal from "../components/UI/modal/MyModal";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";
import Debt from "../components/Debt";
import DocFooter from "../components/DocFooter";
import ProductList from "../components/ProductList";
import { message } from "antd";
import { keysToLowerCase } from "../functions/indexs";
import ok from "../audio/ok.mp3";

const audio = new Audio(ok);

function Document() {
	const { documentsItem, hideFooter, barckTo, isNewDocument } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);
	const [gotProducts, setGotProducts] = useState([]);
	const [products, setProducts] = useState([]);
	const [isFooterOpen, setIsFoterOpen] = useState(false);
	const [modalProductListForSelect, setModalProductListForSelect] =
		useState(false);
	const [isModal2Open, setIsModal2Open] = useState(false);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [dataForUpdateModal, getDataForUpdateModal] = useState("");
	const [formValues, setFormValues] = useState();
	const [barcodeProduct, setBarcodeProduct] = useState([]);
	const [isChangeDocument, setIsChangeDocument] = useState(false);

	useEffect(() => {
		hideFooter();
	}, []);

	useEffect(async () => {
        if(!isNewDocument) {
            setIsLoading(true);
            let obj = { id: documentsItem && documentsItem.Id };
            let res = await sendRequest("demands/get.php", obj);
            setGotProducts(res.List[0].Positions);
            setIsLoading(false);
        }
	}, []);

	useEffect(() => {
		creatProductList();
	}, [selectedProducts, gotProducts, barcodeProduct]);

	const creatProductList = () => {
        let productList = []
        if(isNewDocument) {
            productList = selectedProducts
        }else {
            productList = selectedProducts.concat(gotProducts)
        }
		if (barcodeProduct) {
			productList = productList.concat(barcodeProduct);
		}
		setProducts(productList);
	};
	const deleteProduct = () => {
		let newProductsArr = products.filter((item) => item.Quantity !== 0);
		setProducts(newProductsArr);
	};

	const selectPrd = (arr) => {
		setIsChangeDocument(true);
		setSelectedProducts(arr);
	};
	const getBarcodeProduct = (newBarcodeProduct) => {
		setIsChangeDocument(true);
		setBarcodeProduct([...barcodeProduct, newBarcodeProduct]);
	};
	const getFormValues = (v) => {
		setFormValues(v);
	};
	const key = "updatable";
	const saveButton = async () => {
        if(!formValues.CustomerName){
                message.success({
                    content: "Zəhmət olmasa, qarşı tərəfi seçin",
                    key,
                    duration: 2,
                });
        }else if(!formValues.StockName){
                message.success({
                    content: "Zəhmət olmasa, anbarı seçin!",
                    key,
                    duration: 2,
                });
        }else {
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
            let controller = barckTo;
            let sendObj = keysToLowerCase(formValues);
            if(isNewDocument) {
                let responseName = await sendRequest(controller + "/newname.php", { name: sendObj.name ? sendObj.name : "" });
                sendObj.name = responseName.ResponseService
            }
            let res = await sendRequest(controller + "/put.php", sendObj);
            if (res.ResponseStatus === "0") {
                message.success({
                    content: "Dəyişikliklər yadda saxlanıldı!",
                    key,
                    duration: 2,
                });
                audio.play();
                setIsChangeDocument(false);
            }
        }
	};
	const getQuantity = async (data) => {
		products.forEach((item) => {
			if (item.ProductId === data.Id) {
				item.Quantity = data.Quantity;
			}
		});
	};

	const closeModalProductListForSelect = () => {
		setModalProductListForSelect();
	};

	return (
		<div className="document">
			<MyForm
				initialValues={isNewDocument ? null : documentsItem}
				getFormValues={getFormValues}
				setIsChangeDocument={setIsChangeDocument}
			/>

			{isLoading && <MyLoading />}

			<Debt isNew={isNewDocument} />

			<ProductList
				setModalProductListForSelect={setModalProductListForSelect}
				isFooterOpen={isFooterOpen}
				products={products}
				getDataForUpdateModal={getDataForUpdateModal}
				setIsModal2Open={setIsModal2Open}
				getBarcodeProduct={getBarcodeProduct}
			/>
			<DocFooter
				products={products}
				isFooterOpen={isFooterOpen}
				setIsFoterOpen={setIsFoterOpen}
				saveButton={saveButton}
				isChangeDocument={isChangeDocument}
				setIsChangeDocument={setIsChangeDocument}
			/>

			<MyModal
				visible={modalProductListForSelect}
				setVisible={setModalProductListForSelect}
			>
				<ProductListForSelect
					close={setModalProductListForSelect}
					selectPrd={selectPrd}
				/>
			</MyModal>
		</div>
	);
}

export default Document;
