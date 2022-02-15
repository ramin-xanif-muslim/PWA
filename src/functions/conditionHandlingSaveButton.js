
import { message } from "antd";

const key = "updatable";




export const conditionHandlingSaveButton = (formValues, from) => {
	console.log(from);
	if (!formValues.stockname) {
		message.warning({
			content: "Zəhmət olmasa, anbarı seçin!",
			key,
			duration: 2,
		});
	}
	if (from !== "enters" || from !== "losses") {
		if (!formValues.customername) {
			message.warning({
				content: "Zəhmət olmasa, qarşı tərəfi seçin",
				key,
				duration: 2,
			});
		}
	}
	if (
		(formValues.stockname && formValues.customername) ||
		(from === "enters" && formValues.stockname) ||
		(from === "losses" && formValues.stockname)
	) {
		return true;
	}
};