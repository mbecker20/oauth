import { readJSONFile } from "./helpers";

export const PORT = 2020;
export const HOST = `http://localhost:${PORT}`;
export const SECRETS = readJSONFile("secrets.json");
