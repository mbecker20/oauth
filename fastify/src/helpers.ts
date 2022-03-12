import { readFileSync } from "fs"

export function readJSONFile<T = any>(path: string): T {
	const raw = readFileSync(path);
	return JSON.parse(raw as any);
}