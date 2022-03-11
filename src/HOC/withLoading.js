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

        let sendObj = {dr: 1, sr: "Moment"}
        if(url === 'products') {sendObj = {}}
        if(url === 'stockbalance') {sendObj = {}}
        if(url === 'salepoints') {sendObj = {}}
        if(url === 'customers') {sendObj = {}}
        if(url === 'settlements') {sendObj = {}}
        if(url === 'dashboard') {sendObj = {}}
        if(url === 'salereports') {sendObj.sr = 'ProductName'}
        if(url === 'cashes') {sendObj.sr = ''}

		async function fetchData(page) {
			const res = await sendRequest(`${url}/get.php`, sendObj);
			if (res === null) {
				logout();
			} else {
				setData(res);
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
			/>
		);
	};
}

export default withLoading;
