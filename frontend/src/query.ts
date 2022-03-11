import axios from "axios";

const URL = "http://localhost:2020";

export function loginGithub() {
	axios.get(`${URL}/login/github`, {
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	});
}