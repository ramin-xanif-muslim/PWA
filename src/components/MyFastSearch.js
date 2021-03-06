import React, { useEffect, useState } from "react";
import { Input, Space, Spin } from "antd";
import sendRequest from "../config/sentRequest";

const { Search } = Input;

function MyFastSearch({ url, getDataOnSearch, from }) {
	const [isPut, setIsPut] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setLoading] = useState(false);

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
        setLoading(true)
        let obj = {lm : 100, dr: 1}
        if(from === 'stockbalance') {
            obj.quick = searchTerm
        }
        else { obj.fast = searchTerm }
		let res = await sendRequest(url, obj)
        getDataOnSearch(res.List)
        setLoading(false)
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
            {isLoading && <Spin />}
        </Space>
	);
}

export default MyFastSearch;
