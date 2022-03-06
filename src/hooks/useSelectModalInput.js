import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import SelectPage from "../components/SelectPage";
import MyModal from "../components/UI/modal/MyModal";
import miniArrow_img from "../img/document_pages_img/mini-arrow.svg";

export const useSelectModalInput = (url, title, values, keyInputValue, setValue, isSearchInput = false, searchURL ) => {
	const [visible, setVisible] = useState(false);
	const [select, setSelect] = useState();
    useEffect(() => {
        if (select) {
            setValue([keyInputValue], select.Name);
            if(keyInputValue === 'spendname') {
                setValue([keyInputValue.slice(0, keyInputValue.indexOf("name")) + "item"], select.Id);
            }else{
                setValue([keyInputValue.slice(0, keyInputValue.indexOf("name")) + "id"], select.Id);
            }
        }
    }, [select]);

	const inputSelectModal = (
		<Row className="doc-form-row">
			<Col className="form-label" span={9}>
				<label>{title}:</label>
			</Col>
			<Col
				className="form-input"
				span={12}
				onClick={() => setVisible(true)}
			>
				<input
					style={{ width: "100%" }}
					autoComplete="off"
					type="text"
					name="CustomerName"
					placeholder=""
					value={select ? select.Name : values[keyInputValue] ? values[keyInputValue] : ''}
					readOnly
					required
				/>
			</Col>
			<Col className="form-icons" span={3}>
				<img src={miniArrow_img} />
			</Col>
			<MyModal
				style={{ width: "100%" }}
				visible={visible}
				setVisible={setVisible}
			>
				<SelectPage
					url={url}
					title={title}
					select={setSelect}
					visible={setVisible}
					isSearchInput={isSearchInput}
					searchURL={searchURL}
				/>
			</MyModal>
		</Row>
	);
	return inputSelectModal
};
