import { Component, Show } from "solid-js";
import { loginGithub, loginGoogle } from "../util/helpers";
import Input from "./util/Input";
import Grid from "./util/layout/Grid";
import { createStore } from "solid-js/store";
import Flex from "./util/layout/Flex";
import { client } from "..";
import { User } from "@oauth2/types";

const Login: Component<{ setUser: (user: User | false) => void }> = (p) => {
  const [info, set] = createStore({
    username: "",
    password: "",
  });
  return (
    <Grid>
      <Input
        placeholder="username"
        value={info.username}
        onEdit={(value) => set("username", value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={info.password}
        onEdit={(value) => set("password", value)}
      />
      <Flex style={{ width: "100%" }} justifyContent="space-between">
        <button
          onClick={async () => {
            const user = await client.login(info.username, info.password);
            p.setUser(user);
          }}
        >
          login
        </button>
        <button
          onClick={async () => {
            const user = await client.signup(info.username, info.password);
            p.setUser(user);
          }}
        >
          signup
        </button>
      </Flex>
      <button onClick={loginGithub}>login with github</button>
      <button onClick={loginGoogle}>login with google</button>
    </Grid>
  );
};

export default Login;
