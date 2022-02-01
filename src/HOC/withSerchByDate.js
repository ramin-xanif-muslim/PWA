import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import SearchByDate from "../components/SearchByDate";
import MyLoading from "../components/UI/loading/MyLoading";
import SearchInput from "../components/UI/searcinput/SearchInput";
import { useGlobalContext } from "../config/context";

function withSerchByDate(Component, controller) {
	return (props) => {

		let navigate = useNavigate();
		const { isSearch, hideFooter, putBarckTo, isCreateNewDocument } = useGlobalContext();

		const [data, setData] = useState();
		const [isLoading, setLoading] = useState(false);
		const [obj, setObj] = useState({
			pg: 0,
			nm: "",
			dr: 1,
			sr: "Moment",
			momb: "",
			mome: "",
		});

		const fetchData = async () => {
			setLoading(true);
			let res = await api.fetchData(controller, obj);
			setData(res);
			setLoading(false);
		};
		const fetchSearchTerm = async (searchTerm) => {
			let searchObj = obj;
			searchObj.nm = searchTerm;
			let res = await api.fetchData(controller, searchObj);
			setData(res);
		};

		const getSearcObjByDate = (ob) => {
			setObj(ob);
			fetchData();
		};

		function handleClickOnPlusBtn() {
			navigate(`/document`);
            putBarckTo(controller)
            isCreateNewDocument(true)
		}

		useEffect(() => {
			if (controller !== "documents") {
				hideFooter();
			}
			setData(props.data);
		}, []);
		useEffect(() => {
			if (!isSearch) {
				setObj({ ...obj, nm: "" });
			}
		}, [isSearch]);
		useEffect(() => {
			isCreateNewDocument(false)
		}, []);

		return (
			<div>
				<SearchByDate obj={obj} getSearcObjByDate={getSearcObjByDate} />

				{isSearch && <SearchInput fetchSearchTerm={fetchSearchTerm} />}

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
