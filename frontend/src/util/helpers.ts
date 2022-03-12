export function combineClasses(...classes: (string | undefined)[]) {
  return classes.filter((c) => (c ? true : false)).join(" ");
}

export function getAuthProvider(user: User) {
  if (user.githubID) return "Github";
  else if (user.googleID) return "Google"
}