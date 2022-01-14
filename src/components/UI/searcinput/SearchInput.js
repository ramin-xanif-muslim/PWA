import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import style from "./SearchInput.module.css";

function SearchInput(props) {
	const [searchTerm, setSearchTerm] = useState("");
	const onClick = () => {
		props.fetchSearchTerm(searchTerm);
	};
	return (
		<div className={style.div}>
			<input
				className={style.input}
				autoFocus
				{...props}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button className={style.button} onClick={onClick}>
				<SearchOutlined />
			</button>
		</div>
	);
}

export default SearchInput;
