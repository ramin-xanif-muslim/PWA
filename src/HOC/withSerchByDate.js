import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import SearchByDate from "../components/SearchByDate";
import MyLoading from "../components/UI/loading/MyLoading";
import SearchInput from "../components/UI/searcinput/SearchInput";
import { useGlobalContext } from "../config/context";

function withSerchByDate(Component, controller) {
	return (props) => {

        const { isSearch, hideFooter } = useGlobalContext();

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
			let res = await api.fetchData(controller,obj);
			setData(res);
			setLoading(false);
		};
        const fetchSearchTerm = async (searchTerm) => {
            let searchObj = obj;
            searchObj.nm = searchTerm;
            let res = await api.fetchData(controller,searchObj);
            console.log("withSerchByDate",res)
            setData(res);
        };

		const getSearcObjByDate = (ob) => {
			setObj(ob);
			fetchData();
		};

        useEffect(() => {
            hideFooter();
            setData(props.data)
        },[])

		if (isLoading) {
			return <MyLoading />;
		}
		return (
			<div>
				<SearchByDate obj={obj} getSearcObjByDate={getSearcObjByDate} />

				{isSearch && <SearchInput fetchSearchTerm={fetchSearchTerm} />}

				<Component {...props} data={data} />
			</div>
		);
	};
}

export default withSerchByDate;
