import React, { useEffect, useState } from "react";
import "../styles/SelectProducts.css";
import nullProduct_img from "../img/document_pages_img/null-product.png";
import { Input, Space } from "antd";
import { useGlobalContext } from '../config/context';

const { Search } = Input;

function CustomersListForSelect(props) {
    const { customers } = useGlobalContext()

	return (
		<div className="select-products-modal">
			<div className="select-product-header">
				<h2>Müştəri</h2>
				<Space direction="vertical">
					<Search
						placeholder="Müştəri axtarışı..."
						allowClear
						onSearch={Search}
					/>
				</Space>
			</div>
			<CustomerList
				customers={customers}
			/>
			<button>SƏNƏDƏ QAYIT</button>
		</div>
	);
}

export default CustomersListForSelect;

const CustomerList = ({ customers, setModal, setIndexProductList, setItem }) => {
	return (
		<div className="select-products-body">
			{customers ? (
				customers.map((item, index) => {
					const { Id, Name } = item;

					return (
						<div key={Id}>
							<label className="product" htmlFor={`product${Id}`}>
								<p className="index">{index + 1}</p>
								<img src={nullProduct_img} alt=""></img>
								<div className="texts">
									<p className="name">{Name}</p>
								</div>
							</label>
						</div>
					);
				})
			) : (
				<p></p>
			)}
		</div>
	);
};
