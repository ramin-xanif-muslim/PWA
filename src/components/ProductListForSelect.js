import React, { useEffect, useState } from "react";
import MyModal from "./UI/modal/MyModal";
import "../styles/SelectProducts.css";
import nullProduct_img from "../img/document_pages_img/null-product.png";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import MyFastSearch from "./MyFastSearch";
import ModalEditProductParams from "./ModalEditProductParams";
import { useGlobalContext } from "../config/context";
import { api } from "../api/api";

const { Search } = Input;

const suffix = (
	<AudioOutlined
		style={{
			fontSize: 16,
			color: "#1890ff",
		}}
	/>
);

function ProductListForSelect(props) {
	const { storeProducts } = useGlobalContext();
	const [modal, setModal] = useState(false);
	const [item, setItem] = useState("");
	const [indexProductList, setIndexProductList] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [discount, setDiscount] = useState(0);
	const [products, setProducts] = useState();

	const select = () => {
		props.close(false);
		let arr = storeProducts.filter((p) => p.checkedBox === true);
		props.selectPrd(arr);
	};

	const putQuantity = () => {
		products[indexProductList].Quantity = quantity;
		products[indexProductList].Discount = discount;
		products[indexProductList].Price = item.Price;
		setModal(false);
		setDiscount(null);
		setQuantity(1);
	};
	useEffect(() => {
		if (quantity < 1) {
			setQuantity(1);
		}
	}, [quantity]);
	useEffect(() => {
		if (storeProducts) {
			setProducts(storeProducts);
		}
	}, [storeProducts]);
	const getDataOnSearch = (dataOnSearch) => {
		setProducts(dataOnSearch);
	};
	const getAllProducts = async() => {
		api.fetchProducts();
	};
	return (
		<div className="select-products-modal">
			<div className="select-product-header">
				<h2>Məhsullar</h2>
				<MyFastSearch
					url="products/getfast.php"
					getDataOnSearch={getDataOnSearch}
				/>
			</div>
			<ProductList
				setModal={setModal}
				setIndexProductList={setIndexProductList}
				setItem={setItem}
				products={products ? products : []}
			/>
			<button onClick={select}>SƏNƏDƏ QAYIT</button>
			<MyModal style={style} visible={modal} setVisible={setModal}>
				<ModalEditProductParams
					item={item}
					setItem={setItem}
					quantity={quantity}
					setQuantity={setQuantity}
					putQuantity={putQuantity}
					discount={discount}
					setDiscount={setDiscount}
				/>
			</MyModal>
		</div>
	);
}

export default ProductListForSelect;

const ProductList = ({ products, setModal, setIndexProductList, setItem }) => {
	return (
		<div className="select-products-body">
			{products ? (
				products.map((item, index) => {
					const { Id, Name, StockBalance, Price, BarCode } = item;

					const handelCheckBox = (e) => {
						item.checkedBox = e.target.checked;
						setItem(item);
						e.target.checked && setModal(true);
					};
					const getProductId = () => {
						setIndexProductList(index);
					};

					return (
						<div key={Id} onClick={getProductId}>
							<label className="product" htmlFor={`product${Id}`}>
								<p className="index">{index + 1}</p>
								<img src={nullProduct_img} alt=""></img>
								<div className="texts">
									<p className="name">{Name}</p>
									<p className="barcode">{BarCode}</p>
									<div className="number">
										<p className="price">{Price}₼</p>
										<p
											className={
												StockBalance >= 0
													? "stock-quantity"
													: "stock-quantity red"
											}
										>
											{StockBalance ? StockBalance : 0} əd
										</p>
									</div>
								</div>
								<input
									id={`product${Id}`}
									type="checkbox"
									onChange={handelCheckBox}
								/>
							</label>
						</div>
					);
				})
			) : (
				<p>Mehsullar yoxdur</p>
			)}
		</div>
	);
};

const style = {
	position: "absolute",
	bottom: "0",
	width: "100%",
	background: "#fff",
};
