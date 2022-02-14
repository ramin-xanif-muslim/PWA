import axios from "axios";

const baseURL = "https://dev.bein.az/controllers/";

async function sendRequest(url, obj) {
    Object.assign(obj,{token: localStorage.getItem("Token")})

	let res = await axios.post(baseURL + url, obj);

	if (
		obj.token === "" ||
		res.data.Headers.ResponseStatus === "104" ||
		res.data.Headers.ResponseStatus === "103"
	) {
		localStorage.removeItem("Token");
		alert(res.data.Body);
		return null;
	}
	if (res.data.Headers.ResponseStatus !== "0") {
		alert(res.data.Body);
		return null;
	}
	return res
}

export default sendRequest;
