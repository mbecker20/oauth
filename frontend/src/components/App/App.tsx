import { Component, createResource, Match, Switch } from "solid-js";
import { client } from "../..";
import styles from "./App.module.css";
import { loginGithub, loginGoogle } from "../../util/query";
import UserInfo from "../UserInfo";
import Grid from "../util/layout/Grid";

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
          <Grid>
            <button onClick={loginGithub}>login with github</button>
            <button onClick={loginGoogle}>login with google</button>
          </Grid>
        </Match>
      </Switch>
    </div>
  );
};

export default App;
