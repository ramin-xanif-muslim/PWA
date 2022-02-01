import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../config/context";

function SelectStock({ options, defaultValue, setValue, value }) {
	const { stocks } = useGlobalContext();
	const { Option } = Select;
	const [optionItems, setOptionItems] = useState([]);

    useEffect(() => {
        if(optionItems[0]) {
            setValue("StockName", optionItems[1])
            setValue("StockId", optionItems[0])
        }
    },[optionItems])

	return (
		<Select
			defaultValue={defaultValue}
			value={value}
		>
			{stocks
				? stocks.map((option) => {
						let arr = Object.values(option);
						return (
							<Option value={option.Name} key={option.Id}>
								<div onClick={() => setOptionItems(arr)}>
									{option.Name}
								</div>
							</Option>
						);
				  })
				: ""}
		</Select>
	);
}

export default SelectStock;
