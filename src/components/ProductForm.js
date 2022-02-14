import React, { useEffect, useState } from "react";
import costumer_img from "../img/document_pages_img/costumer.png";
import stock_img from "../img/document_pages_img/stock.png";
import miniArrow_img from "../img/document_pages_img/mini-arrow.svg";
import { Col, DatePicker, Row, Space } from "antd";
import "../styles/Documents.css";
import SelectStock from "./UI/select/SelectStock";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";
import Form from "antd/lib/form/Form";
import Checkbox from "antd/lib/checkbox/Checkbox";
import SelectQroup from "./UI/select/SelectQroup";
import MyModal from "./UI/modal/MyModal";
import SelectPage from "./SelectPage";

function ProductForm(props) {
	const [values, setValues] = useState(
		props.initialValues ? props.initialValues : ""
	);
	const [isFetching, setFetching] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState();
	const [barcode, setBarcode] = useState();
	const [isOpenPage, setIsOpenPage] = useState(false);

	const [isChecked, setIsChecked] = useState(false);
	const handleOnChange = () => {
		setIsChecked(!isChecked);
	};
	const [modalGroupListForSelect, setModalGroupListForSelect] =
		useState(false);

	const getBarcode = async () => {
		let res = await sendRequest("barcode/get.php", {
			w: isChecked ? 1 : 0,
		});
		setBarcode(res);
	};
	useEffect(() => {
		if (!props.initialValues) {
			getBarcode();
		}
	}, []);

	useEffect(() => {
		if (values?.isweight === 1) {
			setIsChecked(true);
		}
	}, []);
	useEffect(() => {
		setValue("isweight", isChecked);
		if (isOpenPage) {
			getBarcode();
		}
		setIsOpenPage(true);
	}, [isChecked]);
	useEffect(() => {
		setValue("barcode", barcode);
	}, [barcode]);

	useEffect(() => {
		console.log(values);
		props.setIsChangeDocument(true);
		setIsOpenPage(true);
		props.getFormValues(values);
	}, [values]);

	useEffect(() => {
		if (selectedGroup) {
			setValue("GroupName", selectedGroup.Name);
			setValue("GroupId", selectedGroup.Id);
		}
	}, [selectedGroup]);

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
		// props.setIsChangeDocument(true);
		setValues((old) => ({ ...old, [field]: value }));
	};

	function onChange(value, dateString) {
		setValue("Moment", dateString);
	}

	if (values === null) {
		return null;
	}
	return (
		<form className="doc-form" onSubmit={submit}>
			<fieldset disabled={isFetching}>
				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={stock_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label>Məhsulun adı:</label>
					</Col>
					<Col className="form-input" span={12}>
						<input
							autoComplete="off"
							type="text"
							name="name"
							placeholder=""
							value={values?.name ?? ""}
							onChange={(e) =>
								setValue("name", e.target.value)
							}
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={stock_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label>Barkod:</label>
					</Col>
					<Col className="form-input" span={12}>
						<input
							autoComplete="off"
							type="text"
							name="productname"
							placeholder=""
							value={barcode ? barcode : values.barcode}
							onChange={(e) => setBarcode(e.target.value)}
							readOnly
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={stock_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label>Qrup:</label>
					</Col>
					<Col
						className="form-input"
						span={12}
						onClick={() => setModalGroupListForSelect(true)}
					>
						<input
							style={{ width: "100%" }}
							autoComplete="off"
							type="text"
							name="CustomerName"
							placeholder=""
							value={
								selectedGroup
									? selectedGroup.Name
									: values.GroupName
							}
							readOnly
							required
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={stock_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label>Artkod:</label>
					</Col>
					<Col className="form-input" span={12}>
						<input
							autoComplete="off"
							type="text"
							name="artcode"
							placeholder=""
							value={values?.artcode ?? ""}
							onChange={(e) =>
								setValue("artcode", e.target.value)
							}
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={description_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label htmlFor="name">Şərh:</label>
					</Col>
					<Col className="form-input" span={12}>
						<input
							autoComplete="off"
							type="text"
							name="description"
							placeholder=""
							value={values?.description ?? ""}
							onChange={(e) =>
								setValue("description", e.target.value)
							}
							required
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={stock_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label>Çəki:</label>
					</Col>
					<Col className="form-input" span={12}>
						<Checkbox
							checked={isChecked}
							onChange={handleOnChange}
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={description_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label htmlFor="name">Alış qiyməti:</label>
					</Col>
					<Col className="form-input" span={12}>
						<input
							autoComplete="off"
							type="number"
							name="buyprice"
							placeholder=""
							value={values?.buyprice ?? ""}
							onChange={(e) =>
								setValue("buyprice", e.target.value)
							}
							required
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={description_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label htmlFor="name">Minimal qiyməti:</label>
					</Col>
					<Col className="form-input" span={12}>
						<input
							autoComplete="off"
							type="number"
							name="minprice"
							placeholder=""
							value={values?.minprice ?? ""}
							onChange={(e) =>
								setValue("minprice", e.target.value)
							}
							required
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						{/* <img src={description_img} /> */}
					</Col>
					<Col className="form-label" span={6}>
						<label htmlFor="name">Satış qiyməti:</label>
					</Col>
					<Col className="form-input" span={12}>
						<input
							autoComplete="off"
							type="number"
							name="price"
							placeholder=""
							value={values?.price ?? ""}
							onChange={(e) => setValue("price", e.target.value)}
							required
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>
			</fieldset>

			<MyModal
				style={{ width: "100%" }}
				visible={modalGroupListForSelect}
				setVisible={setModalGroupListForSelect}
			>
				<SelectPage
					url="productfolders/get.php"
					title="Qrup"
					select={setSelectedGroup}
					visible={setModalGroupListForSelect}
				/>
			</MyModal>
		</form>
	);
}

export default ProductForm;
