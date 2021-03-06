
export function ConvertFixedTable(num) {
	var isNum = !isNaN(parseFloat(num));
	return isNum
		? parseFloat(parseFloat(parseFloat(num).toFixed(4)).toFixed(2))
		: "";
}

export function keysToLowerCase(obj) {
	var keys = Object.keys(obj);
	var n = keys.length;
	while (n--) {
		var key = keys[n]; // "cache" it, for less lookups to the array
		if (key !== key.toLowerCase()) {
			// might already be in its lower case version
			obj[key.toLowerCase()] = obj[key]; // swap the value to a new lower case key
			delete obj[key]; // delete the old key
		}
	}
	return obj;
}

export const convertCamelCaseTextToText = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult =
        result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult
}

export function ConvertFixedPositionInvoice(num) {
  var isNum = !isNaN(parseFloat(num));
  return isNum ? parseFloat(parseFloat(parseFloat(num).toFixed(4))) : null;
}

export function ConvertFixedPosition(num) {
    var isNum = !isNaN(parseFloat(num));
    return isNum ? parseFloat(parseFloat(parseFloat(num).toFixed(4))) : 0.0;
  }
