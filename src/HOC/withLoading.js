import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import MyLoading from "../components/UI/loading/MyLoading";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";

function withLoading(Component, url) {
	return (props) => {
		const { logout } = useGlobalContext();

		const [isLoading, setIsLoading] = useState(false);
		const [data, setData] = useState();
		const [dataList, setDataList] = useState([]);

		async function fetchData(page) {
			const res = await sendRequest(`${url}/get.php`, { pg: page });
			if (res === null) {
				logout();
			} else {
				setData(res);
				setDataList((prev) => [...prev, ...res.List]);
                console.log(res)
			}
			setIsLoading(false);
		}

		useEffect(() => {
			setIsLoading(true);
			fetchData(0);
		}, []);

		if (isLoading) {
			return (
				<div>
					<h1>Loading...</h1>
					<MyLoading />
				</div>
			);
		}
		if (data && data.props) {
			return <Navigate to="login" />;
		}
		return (
			<Component
				{...props}
				data={data}
				fetchData={fetchData}
				dataList={dataList}
			/>
		);
	};
}

export default withLoading;
