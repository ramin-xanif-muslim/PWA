import React, { useEffect, useState } from "react";
import costumer_img from "../img/document_pages_img/costumer.png";
import stock_img from "../img/document_pages_img/stock.png";
import miniArrow_img from "../img/document_pages_img/mini-arrow.svg";
import { Col, DatePicker, Row, Space } from "antd";
import "../styles/Documents.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import MyModal from "./UI/modal/MyModal";
import SelectPage from "./SelectPage";
import { ConvertFixedTable, keysToLowerCase } from "../functions/index";
import { useSelectModalInput } from "../hooks/useSelectModalInput";
import { useInputForm } from "../hooks/useInputForm";

function ProductForm(props) {
	const [values, setValues] = useState(
		props.initialValues ? keysToLowerCase(props.initialValues) : ""
	);
	const [isFetching, setFetching] = useState(false);

	const [isChecked, setIsChecked] = useState(false);
	const handleOnChange = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (props.barcode) {
			setValue("barcode", props.barcode);
		}
	}, [props.barcode]);

	useEffect(() => {
		if (values?.isweight === 1) {
			setIsChecked(true);
		}
	}, []);
	useEffect(() => {
		setValue("isweight", isChecked);
	}, [isChecked]);

	useEffect(() => {
		props.setIsChangeDocument(true);
		props.getFormValues(values);
	}, [values]);

	const submit = async (e) => {
		e.preventDefault();

		try {
			setFetching(true);
		} finally {
			setFetching(false);

			if (props.title?.toLowerCase().includes("create")) {
				// setValues(null);
			}
		}
	};
	const setValue = (field, value) => {
		props.setIsChangeDocument(true);
		setValues((old) => ({ ...old, [field]: value }));
	};

	function onChange(value, dateString) {
		setValue("moment", dateString);
	}
	const customerInput = useSelectModalInput(
		"productfolders/get.php",
		"Qrup",
		values,
		"groupname",
		setValue
	);
	const inputName = useInputForm(
		"Məhsulun adı",
		"text",
		values,
		setValue,
		"name"
	);
	const inputBarcode = useInputForm(
		"Barkod",
		"text",
		values,
		setValue,
		"barcode"
	);
	const inputArtcode = useInputForm(
		"Artkod",
		"text",
		values,
		setValue,
		"artcode"
	);
	const inputDescription = useInputForm(
		"Şərh",
		"text",
		values,
		setValue,
		"description"
	);
	const inputIsweight = useInputForm(
		"Çəki",
		"checkbox",
		values,
		setValue,
		"isweight"
	);
	const inputBuyprice = useInputForm(
		"Alış qiyməti",
		"number",
		values,
		setValue,
		"buyprice"
	);
	const inputMinprice = useInputForm(
		"Minimal qiyməti",
		"number",
		values,
		setValue,
		"minprice"
	);
	const inputPrice = useInputForm(
		"Satış qiyməti",
		"number",
		values,
		setValue,
		"price"
	);
	if (values === null) {
		return null;
	}
	return (
		<form className="doc-form" onSubmit={submit}>
			<fieldset disabled={isFetching}>
				{inputName}

				{inputBarcode}

				{customerInput}

				{inputArtcode}

				{inputDescription}

				{inputIsweight}

				<Row className="doc-form-row">
					<Col className="form-label" span={9}>
						<label>Çəki:</label>
					</Col>
					<Col className="form-input" span={12}>
						<Checkbox
							disabled={props.initialValues ? true : false}
							checked={isChecked}
							onChange={handleOnChange}
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				{inputBuyprice}

				{inputMinprice}

                {inputPrice}
			</fieldset>
		</form>
	);
}

export default ProductForm;
