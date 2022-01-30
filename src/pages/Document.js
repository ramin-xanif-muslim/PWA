import React, { useEffect, useMemo, useState } from "react";
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

function Document() {
	const { documentsItem, hideFooter, barckTo } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);
	const [marks, setMarks] = useState("");
	const [stocks, setStocks] = useState("");
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

	const data = {
		id: documentsItem.Id,
		name: documentsItem.Name,
		moment: documentsItem.Moment,
		stockname: documentsItem.StockName,
		modify: documentsItem.Modify,
		stockid: documentsItem.StockId,
		mark: documentsItem.Mark,
		customerid: documentsItem.CustomerId,
		customername: documentsItem.CustomerName,
		departmentid: documentsItem.DepartmentId,
		ownerid: documentsItem.OwnerId,
		status: documentsItem.Status,
		description: documentsItem.Description,
		consumption: documentsItem.Consumption,
		profit: documentsItem.Profit,
		amount: documentsItem.Amount,
		discount: documentsItem.Discount,
		customerdiscount: documentsItem.CustomerDiscount,
		positions: documentsItem.Positions,
	};

	useEffect(() => {
		hideFooter();
		getMarks();
	}, []);
	const getMarks = async () => {
		setIsLoading(true);
		let res = await sendRequest("marks/get.php", {});
		setMarks(res.List);
		setIsLoading(false);
	};
	useEffect(async () => {
		setIsLoading(true);
		let res = await sendRequest("stocks/get.php", {});
		setStocks(res.List);
		setIsLoading(false);
	}, []);

	useEffect(async () => {
		setIsLoading(true);
		let obj = { id: documentsItem && documentsItem.Id };
		let res = await sendRequest("demands/get.php", obj);
		setGotProducts(res.List[0].Positions);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		creatProductList();
	}, [selectedProducts, gotProducts, barcodeProduct]);

	const creatProductList = () => {
		let productList = selectedProducts.concat(gotProducts);
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
        setIsChangeDocument(true)
		setSelectedProducts(arr);
	};
	const getBarcodeProduct = (newBarcodeProduct) => {
        setIsChangeDocument(true)
		setBarcodeProduct([...barcodeProduct, newBarcodeProduct]);
	};
	const getFormValues = (v) => {
		setFormValues(v);
	};
	const key = "updatable";
	const saveButton = async () => {
		message.loading({ content: "Loading...", key });
		let newArr = products.map((item) => {
			return {
				ProductId: item.ProductId ? item.ProductId : item.Id,
				Quantity: item.Quantity,
				Price: item.Price,
			};
		});
		data.positions = newArr;
		formValues.positions = newArr;
		let controller = barckTo;
		let res = await sendRequest(controller + "/put.php", data);
        if(res.ResponseStatus === '0') {
            message.success({
                content: "Dəyişikliklər yadda saxlanıldı!",
                key,
                duration: 2,
            });
            setIsChangeDocument(false)
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
				stocks={stocks}
				initialValues={documentsItem}
				getFormValues={getFormValues}
				setIsChangeDocument={setIsChangeDocument}
			/>

			{isLoading && <MyLoading />}

			<Debt />

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
