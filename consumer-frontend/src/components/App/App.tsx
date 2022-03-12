import { Component, createResource, Match, Switch } from "solid-js";
import { client } from "../..";
import styles from "./App.module.css";
import UserInfo from "../UserInfo";
import Grid from "../util/layout/Grid";
import { manualLogin } from "../../util/helpers";

const App: Component = () => {
  const [user, { mutate }] = createResource(() => client.getUser());

  return (
    <div class={styles.App}>
      <Grid style={{ "font-size": "2rem" }}>
        <div>Consumer</div>
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
            <button onClick={manualLogin}>login</button>
          </Match>
        </Switch>
      </Grid>
    </div>
  );
};

export default App;
