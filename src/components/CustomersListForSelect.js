import React, { useEffect, useState } from "react";
import "../styles/SelectProducts.css";
import { Input, Space } from "antd";
import MyFastSearch from "./MyFastSearch";
import withLoading from "../HOC/withLoading";

const { Search } = Input;

function CustomersListForSelect(props) {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		if (props.data) {
			setCustomers(props.data.List);
		}
	}, [props.data]);

    const getDataOnSearch = (dataOnSearch) => {
        setCustomers(dataOnSearch)
    }

	return (
		<div className="select-products-modal">
			<div className="select-product-header">
				<h2>Müştəri</h2>
				
                <MyFastSearch url="customers/getfast.php" getDataOnSearch={getDataOnSearch} />
			</div>
			<CustomerList
				customers={customers}
			/>
			<button>SƏNƏDƏ QAYIT</button>
		</div>
	);
}

export default withLoading(CustomersListForSelect, "customers");

const CustomerList = ({ customers, setModal, setIndexProductList, setItem }) => {
	return (
		<div className="select-products-body">
			{customers ? (
				customers.map((item, index) => {
					const { Id, Name } = item;

					return (
						<div key={Id} style={{backgroundColor:"white"}}>
							{/* <label className="product" htmlFor={`product${Id}`}>
								<p className="index">{index + 1}</p>
								<img src={nullProduct_img} alt=""></img>
								<div className="texts">
									<p className="name">{Name}</p>
								</div>
							</label> */}
                            <p>{Name}</p>
						</div>
					);
				})
			) : (
				<p></p>
			)}
		</div>
	);
};
