import React, { useEffect, useState } from "react";
import style from "./CustomersListForSelect.module.css";
import { Input, Space, Spin } from "antd";
import MyFastSearch from "./MyFastSearch";
import { api } from "../api/api";

const { Search } = Input;

function CustomersListForSelect(props) {
	const [customers, setCustomers] = useState();
    const [customersOnList, setCustomersOnList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (customers) {
            setCustomersOnList(customers);
        }
    }, [customers]);

    const getDataOnSearch = (dataOnSearch) => {
        setCustomersOnList(dataOnSearch);
    };
	const getAllCustomers = async() => {
        setIsLoading(true)
		let res = await api.fetchCustomers();
        setCustomers(res.List)
        setIsLoading(false)
	};

    return (
        <div className={style.selectCustomerModal}>
            <div className={style.selectCustomerHeader}>
                <h2>Müştəri</h2>

                <MyFastSearch
                    url="customers/getfast.php"
                    getDataOnSearch={getDataOnSearch}
                />
                <button className="button-get-all-products" onClick={() => getAllCustomers()}>
                    <p>Bütün müştərilər</p>{isLoading && <Spin />}
                </button>
            </div>
            <CustomerList
                customers={customersOnList}
                setSelectedCustomer={props.setSelectedCustomer}
                setVisibleModal={props.setVisibleModal}
            />
            <button onClick={() => props.setVisibleModal(false)}>SƏNƏDƏ QAYIT</button>
        </div>
    );
}

export default CustomersListForSelect;

const CustomerList = ({ customers, setSelectedCustomer, setVisibleModal }) => {
    return (
        <div className={style.selectCustomerBody}>
            {customers ? (
                customers.map((item, index) => {
                    const { Id, Name } = item;

                    const onClick = () => {
                        setSelectedCustomer(item);
                        setVisibleModal(false);
                    };

                    return (
                        <div
							className={style.customer}
                            key={Id}
                            onClick={onClick}
                        >
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
