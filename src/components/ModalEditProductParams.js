import React from "react";
import plus_img from "../img/document_pages_img/plus.svg";
import minus_img from "../img/document_pages_img/minus.svg";

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

export default ModalEditProductParams