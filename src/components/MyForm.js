import React, { useEffect, useState } from "react";
import sale_img from "../img/document_pages_img/sale.png";
import moment_img from "../img/document_pages_img/moment.png";
import costumer_img from "../img/document_pages_img/costumer.png";
import stock_img from "../img/document_pages_img/stock.png";
import description_img from "../img/document_pages_img/description.png";
import status_img from "../img/document_pages_img/status.png";
import miniArrow_img from "../img/document_pages_img/mini-arrow.svg";
import miniArrowDown_img from "../img/document_pages_img/mini-arrow-down.svg";
import { Col, DatePicker, Row, Space } from "antd";
import "../styles/Documents.css";
import SelectStock from "./UI/select/SelectStock";
import MyModal from "./UI/modal/MyModal";
import CustomersListForSelect from "./CustomersListForSelect";

function MyForm(props) {
	const [values, setValues] = useState(
		props.initialValues ? props.initialValues : ""
	);
	const [isFetching, setFetching] = useState(false);
	const [showMoreForm, setShowMoreForm] = useState(false);
	const [modalCustomersListForSelect, setModalCustomersListForSelect] =
		useState(false);

	useEffect(() => {
		props.getFormValues(values);
	}, [values]);

	const submit = async (e) => {
		e.preventDefault();

		try {
			setFetching(true);
			await props.saveButton(values, submit);
		} finally {
			setFetching(false);

			if (props.title?.toLowerCase().includes("create")) {
				setValues(null);
			}
		}
	};
	const setValue = (field, value) => {
		props.setIsChangeDocument(true);
		setValues((old) => ({ ...old, [field]: value }));
	};

	useEffect(() => {
		if (props.initialValues) {
			setValues(props.initialValues);
		}
	}, [props.initialValues]);

	function onChange(value, dateString) {
		setValue("Moment", dateString);
	}

	function onOk(value) {
		console.log("onOk: ", value);
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
						<label htmlFor="title">Təyinat</label>
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
								<label htmlFor="status">Satış №:</label>
							</Col>
							<Col className="form-input" span={12}>
								<input
									autoComplete="off"
									type="text"
									name="sale"
									placeholder="satış nömrəsi"
									value={values?.Name ?? ""}
									onChange={(e) =>
										setValue("Name", e.target.value)
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
								<img src={moment_img} />
							</Col>
							<Col className="form-label" span={6}>
								<label htmlFor="moment">Tarix:</label>
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
						</Row>
						<Row className="doc-form-row">
							<Col className="form-icons" span={3}>
								<img src={status_img} />
							</Col>
							<Col className="form-label" span={6}>
								<label htmlFor="name">Status:</label>
							</Col>
							<Col className="form-input" span={12}>
								<input
									type="text"
									name="name"
									placeholder="status"
									value={values?.Status ?? ""}
									onChange={(e) =>
										setValue("Status", e.target.value)
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
									placeholder="Şərh"
									value={values?.Description ?? ""}
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
						<label htmlFor="status">Anbar:</label>
					</Col>
					<Col className="form-input" span={12}>
						<SelectStock
							defaultValue={values?.StockName ?? ""}
							options={props.stocks}
							setValue={setValue}
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>

				<Row className="doc-form-row">
					<Col className="form-icons" span={3}>
						<img src={costumer_img} />
					</Col>
					<Col
						className="form-input"
						span={18}
						style={{ padding: "0 1rem", justifyContent: "start" }}
                        onClick={() => setModalCustomersListForSelect(true)}
					>
						<input
							style={{ width: "100%" }}
							autoComplete="off"
							type="text"
							name="CustomerName"
							placeholder="Müştəri"
							value={values?.CustomerName ?? ""}
							onChange={(e) =>
								setValue("CustomerName", e.target.value)
							}
							required
						/>
					</Col>
					<Col className="form-icons" span={3}>
						<img src={miniArrow_img} />
					</Col>
				</Row>
			</fieldset>
			<MyModal
				visible={modalCustomersListForSelect}
				setVisible={setModalCustomersListForSelect}
			>
				<CustomersListForSelect
					close={setModalCustomersListForSelect}
				/>
			</MyModal>
		</form>
	);
}

export default MyForm;
