import { readJSONFile } from "./helpers";

export const SECRETS = readJSONFile("../secrets.json");

export const PORT = 2020;