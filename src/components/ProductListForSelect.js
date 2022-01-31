import React, { useEffect, useState } from "react";
import withLoading from "../HOC/withLoading";
import MyModal from "./UI/modal/MyModal";
import "../styles/SelectProducts.css";
import nullProduct_img from "../img/document_pages_img/null-product.png";
import plus_img from "../img/document_pages_img/plus.svg";
import minus_img from "../img/document_pages_img/minus.svg";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import MyFastSearch from "./MyFastSearch";

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
	const [item, setItem] = useState("");
	const [indexProductList, setIndexProductList] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [discount, setDiscount] = useState(0);

	const select = () => {
		props.close(false);
		let arr = props.data.List.filter((p) => p.checkedBox === true);
		props.selectPrd(arr);
	};

	const putQuantity = () => {
		props.data.List[indexProductList].Quantity = quantity;
		props.data.List[indexProductList].Discount = discount;
		props.data.List[indexProductList].Price = item.Price;
		setModal(false);
        setDiscount(null)
		setQuantity(1);
	};
	useEffect(() => {
		if (quantity < 1) {
			setQuantity(1);
		}
	}, [quantity]);
    const getDataOnSearch = (dataOnSearch) => {
        console.log(dataOnSearch)
    }
	return (
		<div className="select-products-modal">
			<div className="select-product-header">
				<h2>Məhsullar</h2>
				{/* <Space direction="vertical">
					<Search
						placeholder="Məhsul axtarışı..."
						allowClear
						onSearch={Search}
					/>
				</Space> */}
                <MyFastSearch url="products/getfast.php" getDataOnSearch={getDataOnSearch} />
			</div>
			<ProductList
				setModal={setModal}
				setIndexProductList={setIndexProductList}
				setItem={setItem}
				products={props.data ? props.data.List : []}
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

export default withLoading(ProductListForSelect, "products");


const ModalEditProductParams = (props) => {
    return (
        <div className="set-data">
            <p className="product-name">{props.item.Name}</p>
            <hr />
            <div className="set-data-body">
                <p className="quantity">Miqdar</p>
                <div className="set-quantity">
                    <button
                        onClick={() => props.setQuantity(props.quantity - 1)}
                        className="decrease"
                    >
                        <img src={minus_img} alt=""></img>
                    </button>
                    <input
                        value={props.quantity}
                        min="0"
                        onChange={(e) =>
                            props.setQuantity(Number(e.target.value))
                        }
                        type="number"
                    />
                    <button
                        onClick={() => props.setQuantity(props.quantity + 1)}
                        className="increase"
                    >
                        <img src={plus_img} alt=""></img>
                    </button>
                </div>
                <div className="price">
                    <label htmlFor="price">Qiymət</label>
                    <input
                        value={props.item ? props.item.Price : 0}
                        onChange={(e) =>
                            props.setItem({ ...props.item, Price: e.target.value })
                        }
                        id="price"
                        type="number"
                        placeholder="₼"
                    ></input>
                </div>
                <div className="discount">
                    <label htmlFor="discount">Endirim:</label>
                    <input
                        value={props.discount}
                        onChange={(e) => props.setDiscount(e.target.value)}
                        id="discount"
                        type="number"
                        placeholder="%"
                    ></input>
                </div>
                <div className="amount">
                    <label htmlFor="amount">Məbləğ:</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="₼"
                    ></input>
                </div>
                <button onClick={props.putQuantity}>Təsdiq et</button>
            </div>
        </div>
        )
}

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
