import { getNumberFromEnv, getStringFromEnv, readJSONFile } from "./helpers";

export const MONGO_URL = getStringFromEnv("MONGO_URL", "mongodb://localhost:27017/oauth")
export const PORT = getNumberFromEnv("PORT", 2020);
export const HOST = `http://localhost:${PORT}`;
export const SECRETS = readJSONFile("/secrets/secrets.json");
export const SALT_ROUNDS = 8;
