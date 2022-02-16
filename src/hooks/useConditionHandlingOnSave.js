import { message } from "antd";

const key = "updatable";




export const useConditionHandlingOnSave = (formValues) => {

	const conditionHandlingOnSaveEnterAndLossDocument = () => {
        if (!formValues.stockname) {
            message.warning({
                content: "Zəhmət olmasa, anbarı seçin!",
                key,
                duration: 2,
            });
        }
        if (formValues.stockname) {
            return true;
        }
    };
	const conditionHandlingOnSave = () => {
	if (!formValues.stockname) {
		message.warning({
			content: "Zəhmət olmasa, anbarı seçin!",
			key,
			duration: 2,
		});
	}
		if (!formValues.customername) {
			message.warning({
				content: "Zəhmət olmasa, qarşı tərəfi seçin",
				key,
				duration: 2,
			});
		}
	if (formValues.stockname && formValues.customername) {
		return true;
	}
};
    return [conditionHandlingOnSave, conditionHandlingOnSaveEnterAndLossDocument]
};