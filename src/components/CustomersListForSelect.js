import React, { useEffect, useState } from "react";
import "../styles/SelectProducts.css";
import { Input, Space } from "antd";
import MyFastSearch from "./MyFastSearch";
import { useGlobalContext } from "../config/context";

const { Search } = Input;

function CustomersListForSelect(props) {
	const { customers } = useGlobalContext();
	const [customersOnList, setCustomersOnList] = useState([]);

	useEffect(() => {
		if (customers) {
			setCustomersOnList(customers);
		}
	}, [customers]);

    const getDataOnSearch = (dataOnSearch) => {
        setCustomersOnList(dataOnSearch)
    }

	return (
		<div className="select-products-modal">
			<div className="select-product-header">
				<h2>Müştəri</h2>
				
                <MyFastSearch url="customers/getfast.php" getDataOnSearch={getDataOnSearch} />
			</div>
			<CustomerList
				customers={customersOnList}
                setSelectedCustomer={props.setSelectedCustomer}
                setVisibleModal={props.setVisibleModal}
			/>
			<button>SƏNƏDƏ QAYIT</button>
		</div>
	);
}

export default CustomersListForSelect

const CustomerList = ({ customers, setSelectedCustomer, setVisibleModal }) => {
	return (
		<div className="select-products-body">
			{customers ? (
				customers.map((item, index) => {
					const { Id, Name } = item;

                    const onClick = () => {
                        setSelectedCustomer(item)
                        setVisibleModal(false)
                    }

					return (
						<div key={Id} style={{backgroundColor:"white"}} onClick={onClick} >
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
