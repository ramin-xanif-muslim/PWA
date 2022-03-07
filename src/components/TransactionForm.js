import React, { useEffect, useState } from "react";
import "../styles/Documents.css";
import { keysToLowerCase } from "../functions/index";
import { useSelectModalInput } from "../hooks/useSelectModalInput";
import { useInputForm } from "../hooks/useInputForm";

function TransactionForm(props) {
	const [values, setValues] = useState(
		props.initialValues ? keysToLowerCase(props.initialValues) : ""
	);
	const [isFetching, setFetching] = useState(false);

	useEffect(() => {
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
    // let valueInputName = values.typename ? values.typename + " №" : 'Məxaric №'
	const inputName = useInputForm(
		values.typename + " №",
		"text",
		values,
		setValue,
		"name"
	);
	const customerInput = useSelectModalInput(
		"customers/get.php",
		"Qarşı-tərəf",
		values,
		"customername",
		setValue,
		true,
		"customers/getfast.php"
	);
	const spendInput = useSelectModalInput(
		"spenditems/get.php",
		"Xərc maddəsi",
		values,
		"spendname",
		setValue
	);
	const inputDescription = useInputForm(
		"Şərh",
		"text",
		values,
		setValue,
		"description"
	);
	const inputBuyprice = useInputForm(
		"Məbləğ",
		"number",
		values,
		setValue,
		"amount"
	);
	const inputDate = useInputForm(
		"Tarix",
		"date",
		values,
		setValue,
		"moment"
	);
	if (values === null) {
		return null;
	}
	if (!values.typename) {
		return <SelectDocumentType setValue={setValue} setIsChangeDocument={props.setIsChangeDocument} />
	}
	return (
		<form className="doc-form" onSubmit={submit}>
			<fieldset disabled={isFetching}>
				{inputName}

				{customerInput}

				{spendInput}

				{inputDescription}

				{inputBuyprice}

				{inputDate}

			</fieldset>
		</form>
	);
}

export default TransactionForm;

const SelectDocumentType = (props) => {
    const onClick = async (event) => {
        await props.setValue('typename',event)
        props.setIsChangeDocument(false)
    }
    return (
        <div>
            <h2 onClick={() => onClick('typename','Nağd mədaxil')}>Nağd mədaxil</h2>
            <h2 onClick={() => onClick('typename','Nağdsız mədaxil')}>Nağdsız mədaxil</h2>
            <h2 onClick={() => onClick('typename','Nağd məxaric')}>Nağd məxaric</h2>
            <h2 onClick={() => onClick('typename','Nağdsız məxaric')}>Nağdsız məxaric</h2>
        </div>
    )
}
