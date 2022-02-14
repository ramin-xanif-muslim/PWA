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
		let navigate = useNavigate();
		const {
			isSearch,
			hideFooter,
			putFrom,
			setIsNewDocument,
			setCustomerId,
		} = useGlobalContext();

		const [data, setData] = useState();
		const [isLoading, setLoading] = useState(false);
		const [obj, setObj] = useState({
			pg: 0,
			dr: 1,
			sr: "Moment",
			momb: "",
			mome: "",
		});
		// const [isPermisionCreatNewDocument, setIsPermisionCreatNewDocument] = useState(false)
		// const permisionCreatNewDocument = ['supplies','supplyreturns','demands','demandreturns','enters','losses']

		// useEffect(() => {
		//     let is = permisionCreatNewDocument.includes(controller)
		//     setIsPermisionCreatNewDocument(is)
		// },[controller])

		const fetchData = async () => {
			setLoading(true);
			let res = await api.fetchData(controller, obj);
			setData(res);
			setLoading(false);
		};
		const fetchSearchTerm = async (searchTerm) => {
			console.log("fetchSearchTerm");
			// let searchObj = obj;
			// searchObj.docNumber = searchTerm;
			let res = await api.fetchData(controller, {fast: searchTerm});
			setData(res);
		};

		const getSearcObjByDate = (ob) => {
			setObj(ob);
			fetchData();
		};

		function handleClickOnPlusBtn() {
			if (controller === "products") {
				navigate(`/document_product`);
			} else {
				navigate(`/document`);
			}
			putFrom(controller);
			setIsNewDocument(true);
		}
		useEffect(() => {
			setData(props.data);
		}, []);
		useEffect(() => {
			if (!isSearch) {
				setObj({ ...obj, nm: "" });
			}
		}, [isSearch]);
		useEffect(() => {
			setIsNewDocument(false);
			setCustomerId(null);
		}, []);

		return (
			<div>
				<SearchByDate obj={obj} getSearcObjByDate={getSearcObjByDate} />

				{isSearch && 
				<MyFastSearch
					url="products/getfast.php"
					getDataOnSearch={fetchSearchTerm}
				/>}
				{/* {isSearch && <SearchInput fetchSearchTerm={fetchSearchTerm} />} */}

				{isLoading ? (
					<MyLoading />
				) : (
					<Component
						{...props}
						data={data}
						from={controller}
						handleClickOnPlusBtn={handleClickOnPlusBtn}
					/>
				)}
			</div>
		);
	};
}

export default withSerchByDate;
