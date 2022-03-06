import { Col, DatePicker, Row, Space } from "antd";
import React, { useEffect } from "react";
import { ConvertFixedTable } from "../functions";
import miniArrow_img from "../img/document_pages_img/mini-arrow.svg";
import moment from "moment";
import locale from "antd/es/date-picker/locale/az_AZ";

moment.locale("az");

export const useInputForm = (lable, type, values, setValue, keyInputValue) => {
	let value = "";
	if (type === "text") {
		value = values[keyInputValue];
	} else if (type === "number") {
		value = ConvertFixedTable(values[keyInputValue]);
	}else if (type === "date" && values[keyInputValue]) {
		value = moment(values[keyInputValue]);
	}

	const rangeConfig = {
		rules: [
			{
				type: "array",
				message: "Please select time!",
			},
		],
	};

	if (type === "date") {
		return (
			<Row className="doc-form-row">
				<Col className="form-label" span={9}>
					<label>{lable}:</label>
				</Col>
				<Col className="form-input" span={12}>
					<Space direction="vertical">
						<DatePicker
									locale={locale}
									{...rangeConfig}
							format="YYYY-MM-DD HH:mm:ss"
                            value={value ? value : ''}
							onChange={(value, dateString) =>
								setValue(keyInputValue, dateString)
							}
							className="date-picker"
							placeholder="tarix"
						/>
					</Space>
				</Col>
				<Col className="form-icons" span={3}>
					<img src={miniArrow_img} />
				</Col>
			</Row>
		);
	}

	return (
		<Row className="doc-form-row">
			<Col className="form-label" span={9}>
				<label>{lable}:</label>
			</Col>
			<Col className="form-input" span={12}>
				<input
					autoComplete="off"
					type={type}
					name="name"
					placeholder=""
					value={value ? value : ""}
					onChange={(e) => setValue(keyInputValue, e.target.value)}
				/>
			</Col>
			<Col className="form-icons" span={3}>
				<img src={miniArrow_img} />
			</Col>
		</Row>
	);
};
