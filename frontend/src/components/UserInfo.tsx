import { Component, Match, Show, Switch } from "solid-js";
import Flex from "./util/layout/Flex";
import Grid from "./util/layout/Grid";

const UserInfo: Component<{ user: User; logout: () => void }> = (p) => {
  return (
    <Grid style={{ "font-size": "2rem" }}>
      <Flex>
        <div>provider:</div>
        <Switch>
          <Match when={p.user.githubID}>
            <div>Github</div>
          </Match>
          <Match when={p.user.googleID}>
            <div>Google</div>
          </Match>
        </Switch>
      </Flex>
      <Flex alignItems="center">
        <div>username: {p.user.username}</div>
        <Show when={p.user.avatar}>
          <img src={p.user.avatar} style={{ width: "2rem", height: "2rem" }} />
        </Show>
      </Flex>
      <div>email: {p.user.email}</div>
      <button style={{ width: "100%" }} onClick={p.logout}>
        logout
      </button>
    </Grid>
  );
};

export default UserInfo;
