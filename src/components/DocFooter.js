import React, { useEffect, useState } from 'react'
import save_img from "../img/document_pages_img/save.png";
import print_img from "../img/document_pages_img/print.png";
import close_img from "../img/document_pages_img/close.png";
import line_img from "../img/document_pages_img/line.svg";
import { Navigate, useNavigate } from 'react-router';
import { useGlobalContext } from '../config/context';

const DocFooter = ({ products, isFooterOpen, setIsFoterOpen, saveButton }) => {

    let navigate = useNavigate();
	const { barckTo } = useGlobalContext();

	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);


	const computationPriceAndQuantity = () => {
		if (products && products[0]) {
			let tq = 0;
			let tp = 0;
			for (let i = 0; i < products.length; i++) {
                if(products &&  products[i] ) {
                    tq += products[i].Quantity;
                    tp += products[i].Price * products[i].Quantity;
                }
			}
			setTotalQuantity(tq);
			setTotalPrice(tp);
		}
	};

    useEffect(() => {
        computationPriceAndQuantity()
    },[products])
    
	return (
		<div
			onClick={() => setIsFoterOpen(!isFooterOpen)}
			className={
				isFooterOpen ? "doc-footer doc-footer-open" : "doc-footer"
			}
		>
			<div className="line">
				<img src={line_img} alt="" />
			</div>
			<div className="texts">
				<div className="text-block">
					<p className="text">Ümumi məbləğ:</p>
					<p className="number">{totalPrice.toFixed(2)}</p>
				</div>
				<div className="text-block">
					<p className="text">Endirim:</p>
					<p className="number"></p>
				</div>
				<div className="text-block-important">
					<p className="text">Yekun məbləğ:</p>
					<p className="number"></p>
				</div>
				<div className="text-block">
					<p className="text">Miqdar</p>
					<p className="number">{totalQuantity}</p>
				</div>
				<div className="text-block">
					<p className="text">Mayası:</p>
					<p className="number"></p>
				</div>
				<div className="text-block">
					<p className="text">Qazanc:</p>
					<p className="number"></p>
				</div>
			</div>
			<div className="submit-buttons">
				<button className="close"onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/${barckTo}`);
                }}>
					<div>
						<img src={close_img} alt="" />
					</div>
					<p>Bağla</p>
				</button>
				<button className="print" onClick={(e) => {
                    e.stopPropagation()
                }}>
					<div>
						<img src={print_img} alt="" />
					</div>
					<p>Print</p>
				</button>
				<button className="save" onClick={(e) => {
                    e.stopPropagation()
                    saveButton()
                }}>
					<div>
						<img src={save_img} alt="" />
					</div>
					<p>Yadda saxla</p>
				</button>
			</div>
		</div>
	);
};

export default DocFooter
