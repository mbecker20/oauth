import { redirectTo, URL } from "..";

export function combineClasses(...classes: (string | undefined)[]) {
  return classes.filter((c) => (c ? true : false)).join(" ");
}

export function getAuthProvider(user: User) {
  if (user.githubID) return "Github";
  else if (user.googleID) return "Google"
}

export function getRedirectTo() {
  const params = location.search.split("=");
  if (params[0] === "?redirect") {
    if (params[1] === "consumer") {
      return {
        service: "consumer",
        url: "http://localhost:3000"
      }
    }
  }
}

export function loginGithub() {
  window.location.replace(
    `${URL}/login/github${redirectTo ? "/" + redirectTo.service : ""}`
  );
}

export function loginGoogle() {
  window.location.replace(
    `${URL}/login/google${
      redirectTo ? "/" + redirectTo.service : ""
    }`
  );
}