import React, { useEffect, useState } from "react";
import sale_img from "../img/document_pages_img/sale.png";
import moment_img from "../img/document_pages_img/moment.png";
import costumer_img from "../img/document_pages_img/costumer.png";
import stock_img from "../img/document_pages_img/stock.png";
import description_img from "../img/document_pages_img/description.png";
import status_img from "../img/document_pages_img/status.png";
import miniArrow_img from "../img/document_pages_img/mini-arrow.svg";
import miniArrowDown_img from "../img/document_pages_img/mini-arrow-down.svg";
import { Checkbox, Col, DatePicker, Row, Space } from "antd";
import "../styles/Documents.css";
import MyModal from "./UI/modal/MyModal";
import { useGlobalContext } from "../config/context";
import Debt from "./Debt";
import SelectPage from "./SelectPage";
import { keysToLowerCase } from "../functions";

function MyForm(props) {
	const { setCustomerId, from } = useGlobalContext();
	const [values, setValues] = useState(
		props.initialValues ? keysToLowerCase(props.initialValues) : ""
	);
	const [isFetching, setFetching] = useState(false);
	const [showMoreForm, setShowMoreForm] = useState(false);
	const [modalCustomersListForSelect, setModalCustomersListForSelect] =
		useState(false);
	const [modalGroupsListForSelect, setModalGroupsListForSelect] =
		useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState();
	const [selectedStock, setSelectedStock] = useState();
	const [isChecked, setIsChecked] = useState(false);

	const handleOnChange = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (values?.status === 1) {
			setIsChecked(true);
		}
		if (!props.initialValues) {
			setIsChecked(true);
		}
	}, []);
	useEffect(() => {
		setValue("status", isChecked);
	}, [isChecked]);
	useEffect(() => {
		props.getFormValues(values);
	}, [values]);
	useEffect(() => {
		if (selectedCustomer) {
			setValue("customername", selectedCustomer.Name);
			setValue("customerid", selectedCustomer.Id);
			setCustomerId(selectedCustomer.Id);
		}
	}, [selectedCustomer]);
	useEffect(() => {
		if (selectedStock) {
			setValue("stockname", selectedStock.Name);
			setValue("stockid", selectedStock.Id);
		}
	}, [selectedStock]);

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

	if (values === null) {
		return null;
	}
	return (
		<form className="doc-form" onSubmit={submit}>
			<fieldset disabled={isFetching}>
				<Row
					className="doc-form-row"
					onClick={() => setShowMoreForm(!showMoreForm)}
				>
					<Col className="form-label" span={21}>
						<label>Təyinat</label>
					</Col>
					<Col className="form-icons" span={3}>
						<img
							src={
								showMoreForm ? miniArrowDown_img : miniArrow_img
							}
						/>
					</Col>
				</Row>

				{showMoreForm && (
					<div>
						<Row className="doc-form-row">
							<Col className="form-icons" span={3}>
								<img src={sale_img} />
							</Col>
							<Col className="form-label" span={6}>
								<label>Satış №:</label>
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
									required
								/>
							</Col>
							<Col className="form-icons" span={3}>
								<img src={miniArrow_img} />
							</Col>
						</Row>

						{/* // datePicer don't worck is true */}

						{/* <Row className="doc-form-row">
							<Col className="form-icons" span={3}>
								<img src={moment_img} />
							</Col>
							<Col className="form-label" span={6}>
								<label>Tarix:</label>
							</Col>
							<Col className="form-input" span={12}>
								<Space direction="vertical">
									<DatePicker
										onChange={onChange}
										className="date-picker"
										placeholder="tarix"
									/>
								</Space>
							</Col>
							<Col className="form-icons" span={3}>
								<img src={miniArrow_img} />
							</Col>
						</Row> */}

						<Row className="doc-form-row">
							<Col className="form-icons" span={3}>
								<img src={status_img} />
							</Col>
							<Col className="form-label" span={6}>
								<label>Status:</label>
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
								<img src={description_img} />
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
										setValue("Description", e.target.value)
									}
									required
								/>
							</Col>
							<Col className="form-icons" span={3}>
								<img src={miniArrow_img} />
							</Col>
						</Row>
					</div>
				)}

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						<img src={stock_img} />
					</Col>
					<Col className="form-label" span={6}>
						<label>Anbar:</label>
					</Col>
					<Col
						className="form-input"
						span={12}
						onClick={() => setModalGroupsListForSelect(true)}
					>
						<input
							style={{ width: "100%" }}
							autoComplete="off"
							type="text"
							name="StockName"
							placeholder=""
							value={
								selectedStock
									? selectedStock.Name
									: values.stockname
							}
							readOnly
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>
				{from === "enters" || from === "losses" ? null : (
					<>
						<Row className="doc-form-row">
							<Col className="form-icons" span={3}>
								<img src={costumer_img} />
							</Col>
							<Col
								className="form-input"
								span={18}
								style={{
									padding: "0 1rem",
									justifyContent: "start",
								}}
								onClick={() =>
									setModalCustomersListForSelect(true)
								}
							>
								<input
									style={{ width: "100%" }}
									autoComplete="off"
									type="text"
									name="CustomerName"
									placeholder="Müştəri"
									value={
										selectedCustomer
											? selectedCustomer.Name
											: values.customername
									}
									readOnly
									required
								/>
							</Col>
							<Col className="form-icons" span={3}>
								<img src={miniArrow_img} />
							</Col>
						</Row>
						<Debt />
					</>
				)}
			</fieldset>

			<MyModal
				style={{ width: "100%" }}
				visible={modalCustomersListForSelect}
				setVisible={setModalCustomersListForSelect}
			>
				<SelectPage
					isSearchInput={true}
					searchURL={"customers/getfast.php"}
					url="customers/get.php"
					title="Müştəri"
					select={setSelectedCustomer}
					visible={setModalCustomersListForSelect}
				/>
			</MyModal>
			<MyModal
				style={{ width: "100%" }}
				visible={modalGroupsListForSelect}
				setVisible={setModalGroupsListForSelect}
			>
				<SelectPage
					// isSearchInput={false}
					// searchURL={"URL"}
					url="stocks/get.php"
					title="Anbarlar"
					select={setSelectedStock}
					visible={setModalGroupsListForSelect}
				/>
			</MyModal>
		</form>
	);
}

export default MyForm;
