import React, { useEffect, useState } from "react";
import { keysToLowerCase } from "../functions/index";
import { useSelectModalInput } from "../hooks/useSelectModalInput";
import { useInputForm } from "../hooks/useInputForm";

function CustomerForm(props) {
	const [values, setValues] = useState(
		props.initialValues ? keysToLowerCase(props.initialValues) : ""
	);
	const [isFetching, setFetching] = useState(false);

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
		}
	};
	const setValue = (field, value) => {
		props.setIsChangeDocument(true);
		setValues((old) => ({ ...old, [field]: value }));
	};
	const inputName = useInputForm(
		"Tərəf-müqabil adı",
		"text",
		values,
		setValue,
		"name"
	);
	const qroupInput = useSelectModalInput(
		"customergroups/get.php",
		"Qrup",
		values,
		"groupname",
		setValue
	);
	// const pricetypeInput = useSelectModalInput(
	// 	"pricetypes/get.php",
	// 	"Qiymət tipi",
	// 	values,
	// 	"pricetypename",
	// 	setValue
	// );
	const inputPhone = useInputForm(
		"Telefon",
		"text",
		values,
		setValue,
		"phone"
	);
	// const inputEmail = useInputForm(
	// 	"Email",
	// 	"text",
	// 	values,
	// 	setValue,
	// 	"mail"
	// );
	const inputDescription = useInputForm(
		"Şərh",
		"text",
		values,
		setValue,
		"description"
	);
	if (values === null) {
		return null;
	}
	return (
		<form className="doc-form" onSubmit={submit}>
			<fieldset disabled={isFetching}>
				{inputName}

				{qroupInput}

                {/* {pricetypeInput} */}

				{inputPhone}

				{/* {inputEmail} */}

				{inputDescription}
			</fieldset>
		</form>
	);
}

export default CustomerForm;
