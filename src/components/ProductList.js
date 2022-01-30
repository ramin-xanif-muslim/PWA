import { Col, Row } from 'antd';
import React, { useState } from 'react'
import product_img from "../img/document_pages_img/product.png";
import other_img from "../img/document_pages_img/other.svg";
import addProduct_img from "../img/document_pages_img/add-product.png";
import barcode_img from "../img/document_pages_img/barcode.png";
import BarcodeModal from './BarcodeModal';
import { ConvertFixedTable } from '../functions/indexs';

const ProductList = ({
	setModalProductListForSelect,
	products,
	setIsModal2Open,
	getDataForUpdateModal,
	isFooterOpen,
    getBarcodeProduct,
}) => {

	const [isModalBarcode, setIsModalBarcode] = useState(false);
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
					const { Name, StockQuantity, Quantity, Id, Price } = item;
                    let amount = Price * Quantity
					const onClick = () => {
						setIsModal2Open(true);
						getDataForUpdateModal(item);
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
										<div>
											<img src={product_img} alt="" />
											<p className="stock-quantity">
												{ StockQuantity ? 0 : StockQuantity }
											</p>
										</div>
									</div>
									<div className="number">
										<div className="amount">
											<p>
												{amount.toFixed(2)}<sub>₼</sub>
											</p>
										</div>
										<div className="quantity-price">
											<p>
												{Quantity}ed * {ConvertFixedTable(Price)}<sub>₼</sub>
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
				<p>Mehsul secilmeyib</p>
			)}

			<div className="add-buttons">
				<button onClick={() => setIsModalBarcode(true)} className="add-barcode">
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

            <BarcodeModal visible={isModalBarcode} setVisible={setIsModalBarcode} getBarcodeProduct={getBarcodeProduct} />

		</div>
	);
};

export default ProductList
