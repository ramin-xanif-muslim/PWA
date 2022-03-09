import React, { useEffect, useState } from "react";
import style from "./CustomersListForSelect.module.css";
import sendRequest from "../config/sentRequest";
import MyLoading from "./UI/loading/MyLoading";
import MyFastSearch from "./MyFastSearch";
import { Button } from "antd";

function SelectPage(props) {
	const [listItems, setListItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);

	const getDataOnSearch = (dataOnSearch) => {
		setListItems(dataOnSearch);
	};

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
	useEffect(() => {
        if(props.url === 'spenditems/get.php' && listItems[0] && !!props.setDefaultValue) {
            // props.setDefaultValue(listItems[0].Name)
        }
        // return () => props.setDefaultValue()
	}, [listItems]);

	return (
		<div className={style.selectCustomerModal}>
			<div className={style.selectCustomerHeader}>
				<h2>{props.title}</h2>
				{props.isSearchInput && (
					<MyFastSearch
						url={props.searchURL}
						getDataOnSearch={getDataOnSearch}
					/>
				)}
			</div>

			{isLoading && <MyLoading />}

			<List
				title={props.title}
				listItems={listItems}
				select={props.select}
				visable={props.visible}
				getData={getData}
				isLoading={isLoading}
			/>
			<button onClick={() => props.visible(false)}>SƏNƏDƏ QAYIT</button>
		</div>
	);
}

export default SelectPage;

const List = ({ listItems, select, visable, getData, title, isLoading }) => {
	let n = 98;
	let indx = 0;
	const onClickButton = () => {
		getData();
		n = n + 100;
	};
	return (
		<div className={style.selectCustomerBody}>
			{listItems ? (
				listItems.map((item, index) => {
					const { Id, Name } = item;
					if (index === n) indx = index;
					const onClick = () => {
						select(item);
						visable(false);
					};

					return (
						<div
							className={style.customer}
							key={Id}
							onClick={onClick}
						>
							<p>
								{index + 1}. {Name}
							</p>
						</div>
					);
				})
			) : (
				<p></p>
			)}
			{indx > n ? (
				<Button
					loading={isLoading}
					className="doc-load-more-btn"
					onClick={onClickButton}
				>
					Daha çox {title}...
				</Button>
			) : (
				""
			)}
		</div>
	);
};
