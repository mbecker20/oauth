/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./components/App/App";
import Client from "./util/client";

export const URL = "http://localhost:4000";
export const AUTH_REDIRECT = "http://localhost:2020/?redirect=consumer";
export const client = new Client(URL);

render(() => <App />, document.getElementById("root") as HTMLElement);
