/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./components/App/App";
import Client from "./util/client";
import { getRedirectTo } from "./util/helpers";
import makeNotifications from "./components/util/notification/Notifications";

export const URL = "http://localhost:2020";
export const client = new Client(URL);
export const redirectTo = getRedirectTo();

export const { Notifications, pushNotification } = makeNotifications();

render(
  () => [<App />, <Notifications />],
  document.getElementById("root") as HTMLElement
);
