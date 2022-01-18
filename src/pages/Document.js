import { Col, Row } from "antd";
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

function Document() {
	const { documentsItem, hideFooter } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);
	const [marks, setMarks] = useState("");
	const [stocks, setStocks] = useState("");
	const [gotProducts, setGotProducts] = useState([]);
	const [products, setProducts] = useState([]);
	const [isFooterOpen, setIsFoterOpen] = useState(false);

	const [modalPrint, setModalPrint] = useState(false);
	const [modalProductListForSelect, setModalProductListForSelect] =
		useState(false);
	const [isModal2Open, setIsModal2Open] = useState(false);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [dataForUpdateModal, getDataForUpdateModal] = useState("");
	const [formValues, setFormValues] = useState();

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
	}, [selectedProducts, gotProducts]);

	const creatProductList = () => {
		let productList = selectedProducts.concat(gotProducts);
		setProducts(productList);
	};
	const deleteProduct = () => {
		let newProductsArr = products.filter((item) => item.Quantity !== 0);
		setProducts(newProductsArr);
	};

	const onChangeMarks = (item) => {
		console.log("ishledi", item);
	};
	const onChangeStocks = (item) => {
		data.stockid = item;
		console.log("ishledi", item);
		console.log("data", data);
	};

	const selectPrd = (arr) => {
		setSelectedProducts(arr);
	};
	const closeModal = () => {
		setModalProductListForSelect(false);
	};
	const closeModal2 = () => {
		deleteProduct();
		setIsModal2Open(false);
	};
    const getFormValues = (v) => {
        setFormValues(v)
    }
	const saveButton = (values, submit) => {
		let newArr = products.map((item) => {
			return {
				ProductId: item.ProductId,
				Quantity: item.Quantity,
				Price: item.Price,
			};
		});
		data.positions = newArr;
		formValues.positions = newArr;
        console.log("data",data)
        console.log("formValues",formValues)
		// sendRequest("demands/put.php", data);
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
			<MyForm stocks={stocks} initialValues={documentsItem} getFormValues={getFormValues} />

			{isLoading && <MyLoading />}
            
            <Debt />

			<ProductList
				setModalProductListForSelect={setModalProductListForSelect}
				isFooterOpen={isFooterOpen}
				products={products}
				getDataForUpdateModal={getDataForUpdateModal}
				setIsModal2Open={setIsModal2Open}
			/>
			<DocFooter
				products={products}
				isFooterOpen={isFooterOpen}
				setIsFoterOpen={setIsFoterOpen}
                saveButton={saveButton}
			/>

			<MyModal
				visible={modalProductListForSelect}
				setVisible={setModalProductListForSelect}
			>
				<ProductListForSelect close={setModalProductListForSelect} selectPrd={selectPrd} />
			</MyModal>

			<MyModal visible={modalPrint} setVisible={setModalPrint}>
				<div>
					<p style={{ color: "black" }}>Qaimə şablon seçin</p>
					<button>A4</button>
					<button>58 mm</button>
					<button>78 mm</button>
				</div>
			</MyModal>
		</div>
	);
}

export default Document;