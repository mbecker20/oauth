import { AUTH_REDIRECT } from "..";
import { User } from "@oauth2/types";

export function combineClasses(...classes: (string | undefined)[]) {
  return classes.filter((c) => (c ? true : false)).join(" ");
}

export function getAuthProvider(user: User) {
  if (user.githubID) return "Github";
  else if (user.googleID) return "Google";
  else return "Local";
}

export function manualLogin() {
  location.replace(AUTH_REDIRECT);
}