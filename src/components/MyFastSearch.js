import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import sendRequest from "../config/sentRequest";

const { Search } = Input;

function MyFastSearch({ url, getDataOnSearch }) {
	const [isPut, setIsPut] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (searchTerm !== "") {
			const timer = setTimeout(() => {
				searchFunc(searchTerm);
			}, 500);
			return () => clearTimeout(timer);
		}
		if (searchTerm === "" && isPut) {
			searchFunc(searchTerm);
		}
	}, [searchTerm]);

	const searchFunc = async () => {
        let obj = {
            fast: searchTerm,
            dr: 1,
        }
		let res = await sendRequest(url, obj)
        getDataOnSearch(res.List)
	};

	const onChange = (e) => {
		setSearchTerm(e);
		setIsPut(true);
	};
    
	return (
        <Space direction="vertical">
            <Search
                value={searchTerm}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Axtarış..."
                allowClear
            />
        </Space>
	);
}

export default MyFastSearch;
