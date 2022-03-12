import { URL } from "..";

export function loginGithub() {
	window.location.replace(`${URL}/login/github`);
}

export function loginGoogle() {
  window.location.replace(`${URL}/login/google`);
}