import { Component, Show } from "solid-js";
import Flex from "./util/layout/Flex";
import Grid from "./util/layout/Grid";

const UserInfo: Component<{ user: User; logout: () => void }> = (p) => {
  return (
    <Grid>
      <Flex alignItems="center">
        <div style={{ "font-size": "2rem" }}>username: {p.user.username}</div>
        <Show when={p.user.avatar}>
          <img src={p.user.avatar} style={{ width: "2rem", height: "2rem" }} />
        </Show>
      </Flex>
      <div style={{ "font-size": "2rem" }}>email: {p.user.email}</div>
      <button style={{ width: "100%" }} onClick={p.logout}>
        logout
      </button>
    </Grid>
  );
};

export default UserInfo;
