import { Component, createResource, Match, Show, Switch } from "solid-js";
import { client } from "../..";
import styles from "./App.module.css";
import { loginGithub } from "../../util/query";
import UserInfo from "../UserInfo";

const App: Component = () => {
  const [user, { mutate }] = createResource(() => client.getUser());

  return (
    <div class={styles.App}>
      <Switch>
        <Match when={user()}>
          <UserInfo
            user={user() as User}
            logout={() => {
              client.logout();
              mutate(false);
            }}
          />
        </Match>
        <Match when={user() === undefined}>
          <div>...</div>
        </Match>
        <Match when={user() === false}>
          <button onClick={loginGithub}>login with github</button>
        </Match>
      </Switch>
    </div>
  );
};

export default App;
