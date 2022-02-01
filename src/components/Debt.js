import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";
import { ConvertFixedTable } from "../functions/indexs";

const Debt = ({ isNew }) => {
	const { documentsItem, customerId } = useGlobalContext();

	const [debt, setDebt] = useState();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(async () => {
		if (!isNew) {
			let obj = { id: documentsItem && documentsItem.CustomerId };
			let res = await sendRequest("customers/getdata.php", obj);
			setDebt(res.Debt);
		}
	}, []);
	useEffect(async () => {
		if (customerId) {
			setIsLoading(true);
			let obj = { id: customerId };
			let res = await sendRequest("customers/getdata.php", obj);
			setDebt(res.Debt);
			setIsLoading(false);
		}
	}, [customerId]);

	return (
		<div className="debt">
			{isLoading ? (
				<Spin />
			) : (
				<p>
					Qalıq borc:
					<strong>
						{ConvertFixedTable(debt)} <sub>₼</sub>
					</strong>
				</p>
			)}
		</div>
	);
};

export default Debt;
