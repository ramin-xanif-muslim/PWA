import React, { useEffect, useRef, useState } from "react";
import MyModal from "./UI/modal/MyModal";
import plus_img from "../img/document_pages_img/plus.svg";
import minus_img from "../img/document_pages_img/minus.svg";
import sendRequest from "../config/sentRequest";

const style = {
	width: "100%",
	background: "#fff",
};

function BarcodeModal(props) {
	const [searchTerm, setSearchTerm] = useState("");
	const { visible, setVisible } = props;
	const [quantity, setQuantity] = useState(1);
	const [data, setData] = useState("");

    const refInput = useRef()

	const getBarcode = async () => {
		let res = await sendRequest("products/getfast.php", {
			fast: searchTerm,
		});
		console.log(res.List[0]);
		if (res.List[0]) {
			setData(res.List[0]);
		} else {
			setData({ Name: "Məhsul tapılmadı" });
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchTerm) {
				if (!isNaN(searchTerm) && searchTerm.length === 13) {
					getBarcode();
				}
			} else {
				console.log("searchterm", searchTerm);
			}
		}, 300);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		if (quantity < 0) {
			setQuantity(0);
		}
	}, [quantity]);
	useEffect(() => {
		if (visible === false) {
			setSearchTerm("");
            setQuantity(1)
		}
	}, [visible]);

	const onOk = () => {
        if(data && data.Name !== "Məhsul tapılmadı" ){
            data.Quantity = quantity;
            props.getBarcodeProduct(data);
        }
        setVisible(false);
	};

	return (
		<MyModal style={style} visible={visible} setVisible={setVisible}>
			<div className="set-data">
				<input
                ref={refInput => refInput && refInput.focus()}
                autoFocus={true}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<p className="product-name">{data ? data.Name : ""}</p>

				<hr />
				<div className="set-data-body">
					<p className="quantity">Miqdar</p>
					<div className="set-quantity">
						<button
							onClick={() => setQuantity(quantity - 1)}
							className="decrease"
						>
							<img src={minus_img} alt=""></img>
						</button>
						<input
							value={quantity}
							min="0"
							onChange={(e) =>
								setQuantity(Number(e.target.value))
							}
						/>
						<button
							onClick={() => setQuantity(quantity + 1)}
							className="increase"
						>
							<img src={plus_img} alt=""></img>
						</button>
					</div>
					<div className="amount">
						<label htmlFor="amount">Məbləğ:</label>
						<input
							id="amount"
							type="number"
							placeholder="₼"
						></input>
					</div>
					<button onClick={onOk}>Təsdiq et</button>
				</div>
			</div>
		</MyModal>
	);
}

export default BarcodeModal;
