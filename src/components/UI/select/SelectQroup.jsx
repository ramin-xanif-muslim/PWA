import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../config/context";
import useRequest from "../../../hooks/useRequest";

function SelectQroup({ options, defaultValue, setValue, value }) {
    const { Option } = Select;
    const [optionItems, setOptionItems] = useState([]);
    const [qroups, setQroups] = useState([]);

	const { data } = useRequest('productfolders/get.php',{sr: "Name"})
    useEffect(() => {
        console.log("data")
        if(data) {
            setQroups(data.List)
        }
    },[])
    useEffect(() => {
        if (optionItems[0]) {
            setValue("StockName", optionItems[1]);
            setValue("StockId", optionItems[0]);
        }
    }, [optionItems]);

    return (
        <Select defaultValue={defaultValue} value={value}>
            {qroups
                ? qroups.map((option) => {
                      let arr = Object.values(option);
                      return (
                          <Option value={option.Name} key={option.Id}>
                              <div onClick={() => setOptionItems(arr)}>
                                  {option.Name}
                              </div>
                          </Option>
                      );
                  })
                : ""}
        </Select>
    );
}

export default SelectQroup;
