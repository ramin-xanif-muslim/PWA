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
        if(props.barcode) {
            setValue('barcode',props.barcode);
        }
    },[props.barcode])

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
    const customerInput = useSelectModalInput("productfolders/get.php","Qrup",values,'groupname',setValue)

    if (values === null) {
        return null;
    }
    return (
        <form className="doc-form" onSubmit={submit}>
            <fieldset disabled={isFetching}>
                <Row className="doc-form-row">
                    <Col className="form-label" span={9}>
                        <label>Məhsulun adı:</label>
                    </Col>
                    <Col className="form-input" span={12}>
                        <input
                            autoComplete="off"
                            type="text"
                            name="name"
                            placeholder=""
                            value={values?.name ?? ""}
                            onChange={(e) => setValue("name", e.target.value)}
                        />
                    </Col>
                    <Col className="form-icons" span={3}>
                        <img src={miniArrow_img} />
                    </Col>
                </Row>

                <Row className="doc-form-row">
                    <Col className="form-label" span={9}>
                        <label>Barkod:</label>
                    </Col>
                    <Col className="form-input" span={12}>
                        <input
                            autoComplete="off"
                            type="text"
                            name="productname"
                            placeholder=""
                            value={values?.barcode ?? ""}
                            onChange={(e) => setValue('barcode',e.target.value)}
                        />
                    </Col>
                    <Col className="form-icons" span={3}>
                        <img src={miniArrow_img} />
                    </Col>
                </Row>

                {customerInput}

                <Row className="doc-form-row">
                    <Col className="form-label" span={9}>
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
                    <Col className="form-label" span={9}>
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

                <Row className="doc-form-row">
                    <Col className="form-label" span={9}>
                        <label htmlFor="name">Alış qiyməti:</label>
                    </Col>
                    <Col className="form-input" span={12}>
                        <input
                            autoComplete="off"
                            type="number"
                            name="buyprice"
                            placeholder=""
                            value={ConvertFixedTable(values?.buyprice) ?? ""}
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
                    <Col className="form-label" span={9}>
                        <label htmlFor="name">Minimal qiyməti:</label>
                    </Col>
                    <Col className="form-input" span={12}>
                        <input
                            autoComplete="off"
                            type="number"
                            name="minprice"
                            placeholder=""
                            value={ConvertFixedTable(values?.minprice) ?? ""}
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
                    <Col className="form-label" span={9}>
                        <label htmlFor="name">Satış qiyməti:</label>
                    </Col>
                    <Col className="form-input" span={12}>
                        <input
                            autoComplete="off"
                            type="number"
                            name="price"
                            placeholder=""
                            value={ConvertFixedTable(values?.price) ?? ""}
                            onChange={(e) => setValue("price", e.target.value)}
                            required
                        />
                    </Col>
                    <Col className="form-icons" span={3}>
                        <img src={miniArrow_img} />
                    </Col>
                </Row>
            </fieldset>
        </form>
    );
}

export default ProductForm;
