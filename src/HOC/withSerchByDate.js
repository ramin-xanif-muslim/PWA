import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import SearchByDate from "../components/SearchByDate";
import MyLoading from "../components/UI/loading/MyLoading";
import SearchInput from "../components/UI/searcinput/SearchInput";
import { useGlobalContext } from "../config/context";
import MyFastSearch from "../components/MyFastSearch";

function withSerchByDate(Component, controller) {
	return (props) => {
		const { openSearchInput } = useGlobalContext();
		let navigate = useNavigate();
		const {
			isSearch,
			hideFooter,
			putFrom,
			setIsNewDocument,
			setCustomerId,
		} = useGlobalContext();

		const [data, setData] = useState();
		const [allData, setAllData] = useState();
		const [searchdata, setsearchdata] = useState();
		const [isLoading, setLoading] = useState(false);

        let sr = 'Moment'
        if(controller === 'salereports') { sr = 'ProductName'}
        if(controller === 'cashes') { sr = ''}

		const [obj, setObj] = useState({
			pg: 0,
			dr: 1,
			sr: sr,
			momb: "",
			mome: "",
		});
		const fetchData = async () => {
			setLoading(true);
			let res = await api.fetchData(controller, obj);
			setData(res.List);
			setLoading(false);
		};
		const fetchSearchTerm = async (searchTerm) => {
			let searchObj = obj;
			searchObj.docNumber = searchTerm;
			let res = await api.fetchData(controller, searchObj);
			setData(res.List);
		};
		const getMoreData = async (page) => {
			let res = await api.fetchData(controller, { pg: page });
			setData((prev) => [...prev, ...res.List]);
		};

		const getSearcObjByDate = (ob) => {
			setObj(ob);
			fetchData();
		};
		const getDataOnSearch = (dataOnSearch) => {
			setData(dataOnSearch);
		};

		function handleClickOnPlusBtn() {
			if (controller === "transactions") {
				navigate(`/document_transactions`);
            } else if (controller === "products") {
				navigate(`/document_product`);
            } else if (controller === "customers") {
				navigate(`/document_customer`);
			} else {
				navigate(`/document`);
			}
			putFrom(controller);
			setIsNewDocument(true);
		}
		useEffect(() => {
            setAllData(props.data);
			if (props.data?.List) {
				setData(props.data.List);
			}
		}, []);
		useEffect(() => {
			if (!isSearch) {
				setObj({ ...obj, nm: "" });
			}
		}, [isSearch]);
		useEffect(() => {
			openSearchInput(false);
			setIsNewDocument(false);
			setCustomerId(null);
		}, []);

		return (
			<div>
				{controller === "products" ||
				controller === "stockbalance" ? null : (
					<SearchByDate
						obj={obj}
						getSearcObjByDate={getSearcObjByDate}
					/>
				)}

				{controller === "products" ? (
					<MyFastSearch
						from="products"
						url={controller + "/getfast.php"}
						getDataOnSearch={getDataOnSearch}
					/>
				) : null}

				{controller === "stockbalance" ? (
					<MyFastSearch
						from="stockbalance"
						url={controller + "/get.php"}
						getDataOnSearch={getDataOnSearch}
					/>
				) : null}

				{controller !== "products" &&
				controller !== "stockbalance" &&
				isSearch ? (
					<SearchInput fetchSearchTerm={fetchSearchTerm} />
				) : null}

				{isLoading ? (
					<MyLoading />
				) : (
					<Component
						{...props}
						getMoreData={getMoreData}
						data={data}
						allData={allData}
						from={controller}
						handleClickOnPlusBtn={handleClickOnPlusBtn}
					/>
				)}
			</div>
		);
	};
}

export default withSerchByDate;
