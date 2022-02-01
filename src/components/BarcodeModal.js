import React, { useEffect, useRef, useState } from "react";
import MyModal from "./UI/modal/MyModal";
import plus_img from "../img/document_pages_img/plus.svg";
import minus_img from "../img/document_pages_img/minus.svg";
import sendRequest from "../config/sentRequest";
import { ConvertFixedTable } from "../functions/indexs";
import bc from "../audio/bc.mp3";


const audio = new Audio(bc);

const style = {
    width: "100%",
    background: "#fff",
    position: "absolute",
    bottom: "0",
};

function BarcodeModal(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const { visible, setVisible } = props;
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [isFocusOnRefInput, setIsFocusOnRefInput] = useState(true);
    const [isDisableBarcodeInput, setIsDisableBarcodeInput] = useState(false);

    const refInput = useRef();

    const getBarcode = async () => {
        let res = await sendRequest("products/getfast.php", {
            fast: searchTerm,
        });
        console.log(res.List[0]);
        if (res.List[0]) {
            setData(res.List[0]);
            setPrice(ConvertFixedTable(Number(res.List[0].Price)));
            setName(res.List[0].Name);
        } else {
            setName("Məhsul tapılmadı");
        }
        setSearchTerm("");
        setIsDisableBarcodeInput(false);
    };
    useEffect(() => {
        if (data) {
            setTotalPrice(quantity * price);
        }
    }, [quantity, price]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm) {
                if (!isNaN(searchTerm) && searchTerm.length === 13) {
                    getBarcode();
                    setIsFocusOnRefInput(false);
                    setIsDisableBarcodeInput(true);
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
            setQuantity(1);
            setTotalPrice(0);
            setPrice(0);
            setName("");
			setIsFocusOnRefInput(true);
        }
    }, [visible]);

    const onOk = () => {
        if (data && name !== "Məhsul tapılmadı") {
            data.Quantity = quantity;
            data.Price = price;
            props.getBarcodeProduct(data);
            audio.play();
        }
        setSearchTerm("");
        setQuantity(1);
        setTotalPrice(0);
        setPrice(0);
        setName("");
        setIsFocusOnRefInput(true);
    };

    return (
        <MyModal style={style} visible={visible} setVisible={setVisible}>
            <div className="set-data">
                <input
                    className="barcode-text"
                    ref={(refInput) =>
                        isFocusOnRefInput && refInput && refInput.focus()
                    }
                    disabled={isDisableBarcodeInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className="product-name">{name}</p>

                <hr className="hr" />
                <div className="set-data-body">
                    <div className="quantity-amount">
                        <div className="price">
                            <label htmlFor="price">Qiymət</label>
                            <input
                                value={price}
                                onChange={(e) =>
                                    setPrice(Number(e.target.value))
                                }
                                id="price"
                                type="number"
                                placeholder="₼"
                            ></input>
                        </div>
                        <div className="amount">
                            <label htmlFor="amount">Məbləğ:</label>
                            <input
                                value={totalPrice}
                                onChange={(e) =>
                                    setTotalPrice(Number(e.target.value))
                                }
                                id="amount"
                                type="number"
                                placeholder="₼"
                            ></input>
                        </div>
                    </div>
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
                    <button className="btn-ok" onClick={onOk}>Təsdiq et</button>
                    {/* <button onClick={() => setVisible(false)}>Bagla</button> */}
                </div>
            </div>
        </MyModal>
    );
}

export default BarcodeModal;
