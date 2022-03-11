import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { ConvertFixedTable } from "../functions";
import Document from "./Document";

function DocumentList({ list, from, getMoreData, allData }) {
	const [isLoading, setIsLoading] = useState(false);
	const [count, setCount] = useState(99);
	const [page, setPage] = useState(1);
	const [mapList, setMapList] = useState([]);

	const getMore = async () => {
		setIsLoading(true);
		await getMoreData(page);
		setPage(page + 1);
		setCount(count + 100);
		setIsLoading(false);
	};
	useEffect(() => {
		if (from === 'profit' && allData) {
            const { CostSum, SaleSum, SpendItems } = allData;
			let childrenArray = [];
			let spendItemsSum = 0;
			SpendItems.forEach((d) => {
				spendItemsSum += parseFloat(d.Amount);
			});
			SpendItems.forEach((d) => {
				childrenArray.push({
					key: d.Id,
					Name: d.Name,
					Profit: ConvertFixedTable(d.Amount),
				});
			});
			let clearProfit = isNaN(
				ConvertFixedTable(
					SaleSum - CostSum - spendItemsSum
				)
			)
				? "0"
				: ConvertFixedTable(
						SaleSum - CostSum - spendItemsSum
				  );
			let cycleProfit = isNaN(
				ConvertFixedTable(SaleSum - CostSum)
			)
				? "0"
				: ConvertFixedTable(SaleSum - CostSum);
			let datas = [
				{
					Name: <span className="boldContent">Satış dövrüyyəsi</span>,
					Profit: ConvertFixedTable(SaleSum),
				},
				{
					Name: "Mayası",
					Profit: ConvertFixedTable(CostSum),
				},
				{
					Name: 'Dövrüyyə mənfəəti',
					Profit: cycleProfit,
				},
				{
					Name: "Xərclər (toplam)",
					Profit: ConvertFixedTable(spendItemsSum),
					children: childrenArray,
				},
				{
					Name: 'Təmiz mənfəət',
					Profit: ConvertFixedTable(clearProfit),
				},
			];
            setMapList(datas)
		} 
        else { setMapList(list)}
	}, [allData]);
	return (
		<div className="demands_wrapper">
			{mapList
				? mapList.map((item, index) => {
						return (
							<div key={index}>
								<Document
									item={item}
									index={index + 1}
									from={from}
                                    allData={allData}
								/>
								{index === count && (
									<Button
										loading={isLoading}
										className="doc-load-more-btn"
										onClick={getMore}
									>
										Daha çox ...
									</Button>
								)}
							</div>
						);
				  })
				: ""}
		</div>
	);
}

export default DocumentList;