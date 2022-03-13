import { Component, Show } from "solid-js";
import { AUTH_REDIRECT, client } from "..";
import { getAuthProvider } from "../util/helpers";
import Flex from "./util/layout/Flex";
import Grid from "./util/layout/Grid";
import { User } from "@oauth2/types";

const UserInfo: Component<{ user: User }> = (p) => {
  return (
    <Grid style={{ "font-size": "2rem" }}>
      <div>provider: {getAuthProvider(p.user)}</div>
      <Flex alignItems="center">
        <div>username: {p.user.username}</div>
        <Show when={p.user.avatar}>
          <img src={p.user.avatar} style={{ width: "2rem", height: "2rem" }} />
        </Show>
      </Flex>
      <Show when={p.user.email}>
        <div>email: {p.user.email}</div>
      </Show>
      <button
        style={{ width: "100%" }}
        onClick={() => location.replace(AUTH_REDIRECT)}
      >
        refresh user
      </button>
      <button style={{ width: "100%" }} onClick={() => client.logout()}>
        logout
      </button>
    </Grid>
  );
};

export default UserInfo;
