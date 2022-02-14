import React, { useEffect, useState } from "react";
import style from "./CustomersListForSelect.module.css";
import sendRequest from "../config/sentRequest";
import MyLoading from "./UI/loading/MyLoading";

function SelectPage(props) {
	const [listItems, setListItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);

	const getData = async () => {
		setIsLoading(true);
		let res = await sendRequest(props.url, { pg: page });
		setListItems((prev) => [...prev, ...res.List]);
		setPage(page + 1);
		setIsLoading(false);
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div className={style.selectCustomerModal}>
			<div className={style.selectCustomerHeader}>
				<h2>{props.title}</h2>
			</div>
			{isLoading && <MyLoading />}
			<List
				title={props.title}
				listItems={listItems}
				select={props.select}
				visable={props.visible}
				getData={getData}
			/>
			<button onClick={() => props.visible(false)}>SƏNƏDƏ QAYIT</button>
		</div>
	);
}

export default SelectPage;

const List = ({ listItems, select, visable, getData, title }) => {
	const [isVisibleButton, setIsVisibleButton] = useState(false);
	return (
		<div className={style.selectCustomerBody}>
			{listItems ? (
				listItems.map((item, index) => {
					const { Id, Name } = item;
                    if(index === 99) {
                        setIsVisibleButton(true)
                    }
					const onClick = () => {
						console.log(item);
						select(item);
						visable(false);
					};

					return (
						<div
							className={style.customer}
							key={Id}
							onClick={onClick}
						>
							<p>{index + 1}. {Name}</p>
						</div>
					);
				})
			) : (
				<p></p>
			)}
            {isVisibleButton && 
			<button
				className="button-get-all-products"
				onClick={() => getData()}
			>
				<p>Bütün {title}</p>
			</button> 
            }
		</div>
	);
};
