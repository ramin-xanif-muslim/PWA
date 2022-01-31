import { Select } from "antd";
import React, { useEffect, useState } from "react";

//<MySelect defaultValue='...' options={options} onChange={onChangeSelect} value={selected}/>

// const [selected, setSelected] = useState('')

//const onChangeSelect = (value) => {
//   setSelected(value)
//}

function SelectStock({ options, defaultValue, setValue, value }) {
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
			{options
				? options.map((option) => {
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
