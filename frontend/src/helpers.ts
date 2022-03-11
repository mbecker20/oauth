import { URL } from ".";

export function readJWTFromUrlParams() {
	const params = location.search.split("=");
	if (params[0] === "?token") {
		history.replaceState({}, "", URL);
		localStorage.setItem("access_token", params[1])
		return params[1];
	}
}