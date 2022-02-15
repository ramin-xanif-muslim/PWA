import React, { useEffect, useState } from "react";
import plus_img from "../img/document_pages_img/plus.svg";
import minus_img from "../img/document_pages_img/minus.svg";
import { ConvertFixedTable } from "../functions";

const ModalEditProductParams = (props) => {
    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        if (props.item) {
            setTotalPrice(props.quantity * props.item.Price);
        }
    }, [props.quantity, props.item.Price]);
    return (
        <div className="set-data">
            <p className="product-name">
                {props.item.Name} <span>- {props.item.BarCode} (</span>
                <span className={props.item.StockBalance < 0 ? "red" : ""}>
                    {props.item.StockBalance} əd
                </span>
                <span>)</span>
            </p>
            <hr />
            <div className="set-data-body">
                <div className="price">
                    <label htmlFor="price">Qiymət</label>
                    <input
                        value={props.item ? props.item.Price : 0}
                        onChange={(e) =>
                            props.setItem({
                                ...props.item,
                                Price: e.target.value,
                            })
                        }
                        id="price"
                        type="number"
                        placeholder="₼"
                    ></input>
                </div>
                {/* <div className="discount">
                    <label htmlFor="discount">Endirim:</label>
                    <input
                        value={props.discount}
                        onChange={(e) => props.setDiscount(e.target.value)}
                        id="discount"
                        type="number"
                        placeholder="%"
                    ></input>
                </div> */}
                <div className="amount">
                    <label htmlFor="amount">Məbləğ:</label>
                    <input id="amount" type="number" placeholder="₼"></input>
                </div>
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
                        value={
                            props.item
                                ? ConvertFixedTable(Number(props.item.Price))
                                : 0
                        }
                        onChange={(e) =>
                            props.setItem({
                                ...props.item,
                                Price: e.target.value,
                            })
                        }
                        id="price"
                        type="number"
                        placeholder="₼"
                    ></input>
                </div>
                {/* <div className="discount">
                    <label htmlFor="discount">Endirim:</label>
                    <input
                        value={props.discount}
                        onChange={(e) => props.setDiscount(e.target.value)}
                        id="discount"
                        type="number"
                        placeholder="%"
                    ></input>
                </div> */}
                <div className="amount">
                    <label htmlFor="amount">Məbləğ:</label>
                    <input
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(Number(e.target.value))}
                        id="amount"
                        type="number"
                        placeholder="₼"
                    ></input>
                </div>
                <button onClick={props.putQuantity}>Təsdiq et</button>
            </div>
        </div>
    );
};

export default ModalEditProductParams;
