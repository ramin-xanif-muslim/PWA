import React, { useEffect, useState } from "react";
import MyModal from "./UI/modal/MyModal";
import "../styles/SelectProducts.css";
import nullProduct_img from "../img/document_pages_img/null-product.png";
import { Button, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import MyFastSearch from "./MyFastSearch";
import ModalEditProductParams from "./ModalEditProductParams";
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
	const [modal, setModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [item, setItem] = useState("");
	const [indexProductList, setIndexProductList] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [page, setPage] = useState(1);
	const [discount, setDiscount] = useState(0);
	const [products, setProducts] = useState([]);

	const select = () => {
		if (products) {
			let arr = products.filter((p) => p.checkedBox === true);
			props.selectPrd(arr);
		}
		setProducts([]);
		props.close(false);
        setPage(1)
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
	const getDataOnSearch = (dataOnSearch) => {
        let arr = products.filter((p) => p.checkedBox === true);
        props.selectPrd(arr);
		setProducts(dataOnSearch);
	};
	const getAllProducts = async () => {
		setIsLoading(true);
		let res = await api.fetchProducts({ pg: page });
		setProducts((prev) => [...prev, ...res.List]);
		setPage(page + 1);
		setIsLoading(false);
	};
	return (
		<div className="select-products-modal">
			<div className="select-product-header">
				<h2>Məhsullar</h2>
				<MyFastSearch
					url="products/getfast.php"
					getDataOnSearch={getDataOnSearch}
				/>
				<Button
					loading={isLoading}
					className="button-get-all-products"
					onClick={() => getAllProducts()}
				>
					Bütün məhsullar
				</Button>
			</div>
			<ProductList
				getAllProducts={getAllProducts}
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

const ProductList = ({
	products,
	setModal,
	setIndexProductList,
	setItem,
	getAllProducts,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [count, setCount] = useState(99);
	const [page, setPage] = useState(1);
    
	const getMore = async () => {
		setIsLoading(true);
		await getAllProducts(page);
		setPage(page + 1);
        setCount(count + 100)
		setIsLoading(false);
	};
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
							{index === count && (
								<Button
									loading={isLoading}
									className="doc-load-more-btn"
									onClick={getMore}
								>
									Daha çox...
								</Button>
							)}
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
