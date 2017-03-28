export function urlParse() {
	let url = window.location.search;
	let obj = {}	;
	let reg = /[?&][^?&]+=[^?&]/g;
	let arr = url.match(reg);

	if(arr){
		arr.forEach((item) => {
			let tmp = item.substring(1).split("=");
			let key = decodeURIComponent(tmp[0]);
			let val = decodeURIComponent(tmp[1]);

			obj[key] = val;
		})
	}
	return obj;
};