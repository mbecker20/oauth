import { getStringFromEnv } from "./helpers";

export const MONGO_URL = getStringFromEnv(
  "MONGO_URL",
  "mongodb://localhost:27017/oauth"
);
export const AUTH_URL = "http://localhost:2020/auth_jwt";
export const PORT = 3000;
