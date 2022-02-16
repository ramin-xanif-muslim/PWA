import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";
import { ConvertFixedTable } from "../functions/index";

const Debt = () => {
	const { documentsItem, customerId } = useGlobalContext();

	const [debt, setDebt] = useState();
	const [isLoading, setIsLoading] = useState(false);

    const fetchDebt = async (cusId) => {
        setIsLoading(true);
        let obj = { id: cusId };
        let res = await sendRequest("customers/getdata.php", obj);
        setDebt(res.Debt);
        setIsLoading(false);
    }
	useEffect(() => {
		if (documentsItem) {
            fetchDebt(documentsItem.customerid)
        }
	}, []);
	useEffect(() => {
		if (customerId) {
            fetchDebt(customerId)
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
