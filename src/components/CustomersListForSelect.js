import React, { useEffect, useState } from "react";
import style from "./CustomersListForSelect.module.css";
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
        setCustomersOnList(dataOnSearch);
    };

    return (
        <div className={style.selectCustomerModal}>
            <div className={style.selectCustomerHeader}>
                <h2>Müştəri</h2>

                <MyFastSearch
                    url="customers/getfast.php"
                    getDataOnSearch={getDataOnSearch}
                />
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
