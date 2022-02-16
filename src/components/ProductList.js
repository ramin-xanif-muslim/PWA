import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import product_img from "../img/document_pages_img/product.png";
import other_img from "../img/document_pages_img/other.svg";
import addProduct_img from "../img/document_pages_img/add-product.png";
import barcode_img from "../img/document_pages_img/barcode.png";
import BarcodeModal from "./BarcodeModal";
import { ConvertFixedTable } from "../functions";
import ModalEditProductParams from "./ModalEditProductParams";
import MyModal from "./UI/modal/MyModal";

const ProductList = ({
	setModalProductListForSelect,
	products,
	isFooterOpen,
	getBarcodeProduct,
	deleteProduct,
	setIsChangeDocument,
}) => {
	const [isModalBarcode, setIsModalBarcode] = useState(false);
	const [item, setItem] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [discount, setDiscount] = useState(0);
	const [indexProductList, setIndexProductList] = useState(null);
	const [isModalEditProductParams, setIsModalEditProductParams] =
		useState(false);

	useEffect(() => {
		if (quantity < 0) {
			setQuantity(0);
		}
        console.log(products)
	}, [quantity]);

	const putQuantity = () => {
		products[indexProductList].Quantity = quantity;
		products[indexProductList].Discount = discount;
		products[indexProductList].Price = item.Price;
		setIsModalEditProductParams(false);
		setDiscount(null);
		setQuantity(1);
		deleteProduct();
		setIsChangeDocument(true);
	};
	return (
		<div
			className={
				isFooterOpen
					? "product-list product-list-small"
					: "product-list"
			}
		>
			{products[0] ? (
				products.map((item, index) => {
					const {
						Name,
						StockQuantity,
                        StockBalance,
						Quantity,
						Id,
						Price,
						BarCode,
					} = item;
					let amount = Price * Quantity;
					const onClick = () => {
						setIsModalEditProductParams(true);
						setItem(item);
						setIndexProductList(index);
						setQuantity(Quantity);
					};
					return (
						<div key={index} onClick={onClick}>
							<Row className="row-products">
								<Col className="index" span={2}>
									<p>{index + 1}</p>
								</Col>
								<Col className="body" span={20}>
									<div className="text">
										<p className="product-name">{Name}</p>
										<p className="product-barcode">
											{BarCode}
										</p>
										<div>
											<img src={product_img} alt="" />
											<p className="stock-quantity">
												{StockQuantity
													? StockQuantity : StockBalance ? StockBalance 
													: ''}
											</p>
										</div>
									</div>
									<div className="number">
										<div className="amount">
											<p>
												{amount.toFixed(2)}
												<sub>₼</sub>
											</p>
										</div>
										<div className="quantity-price">
											<p>
												{ConvertFixedTable(Number(Quantity))}ed *{" "}
												{ConvertFixedTable(Number(Price))}
												<sub>₼</sub>
											</p>
										</div>
									</div>
								</Col>
								<Col className="other" span={2}>
									<button>
										<img src={other_img} alt="" />
									</button>
								</Col>
							</Row>
						</div>
					);
				})
			) : (
				<p style={{ textAlign: "center", opacity: "0.8" }}>
					Mehsul secilmeyib
				</p>
			)}

			<div className="add-buttons">
				<button
					onClick={() => setIsModalBarcode(true)}
					className="add-barcode"
				>
					<img src={barcode_img} alt="" />
				</button>
				<button
					onClick={() => setModalProductListForSelect(true)}
					className="add-manual"
				>
					<img src={addProduct_img} alt="" />
					<p>Məhsul əlavə et</p>
				</button>
			</div>

			<MyModal
				style={style}
				visible={isModalEditProductParams}
				setVisible={setIsModalEditProductParams}
			>
				<ModalEditProductParams
					item={item}
					setItem={setItem}
					quantity={ConvertFixedTable(Number(quantity))}
					setQuantity={setQuantity}
					putQuantity={putQuantity}
					discount={discount}
					setDiscount={setDiscount}
				/>
			</MyModal>

			<BarcodeModal
				visible={isModalBarcode}
				setVisible={setIsModalBarcode}
				getBarcodeProduct={getBarcodeProduct}
			/>
		</div>
	);
};

export default ProductList;

const style = {
	position: "absolute",
	bottom: "0",
	width: "100%",
	background: "#fff",
};
