import axios from "axios";
import { FastifyInstance } from "fastify";
import fastifyOauth2, { OAuth2Namespace } from "fastify-oauth2";
import { PORT, SECRETS } from "../config";

declare module "fastify" {
  interface FastifyInstance {
    github: OAuth2Namespace;
  }
}

export default function (app: FastifyInstance) {
  app.register(fastifyOauth2, {
    name: "github",
    scope: ["user:email"], // empty for only basic access to acct, ie info that is is already public about your acct.
    credentials: {
      client: {
        id: SECRETS.GITHUB.ID,
        secret: SECRETS.GITHUB.SECRET,
      },
      auth: fastifyOauth2.GITHUB_CONFIGURATION,
    },
    // location.replace this route to redirect to github
    startRedirectPath: "/login/github",
    // github redirects here after user logs in
    callbackUri: "http://localhost:2020/login/github/callback",
  });

  app.get("/login/github/callback", async (req, res) => {
    const token = await app.github.getAccessTokenFromAuthorizationCodeFlow(req);
    const profile = await getGithubProfile(token.access_token);
    const existingUser = await app.users.findOne({ username: profile.username });
    if (existingUser) {
      const jwt = app.jwt.sign(
        { id: existingUser._id.toString() },
        { expiresIn: token.expires_in }
      );
      res.redirect(`http://localhost:${PORT}/?token=${jwt}`);
    } else {
      const email = await getGithubEmail(token.access_token);
      const createdUser = await app.users.create({
        username: profile.username,
        avatar: profile.avatar,
        githubID: profile.id,
        email,
      });
      const jwt = app.jwt.sign(
        { id: createdUser._id.toString() },
        { expiresIn: token.expires_in }
      );
      res.redirect(`http://localhost:${PORT}/?token=${jwt}`);
    }
  });
}

async function getGithubProfile(token: string) {
  const profile = await axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then(({ data }) => data);
  return {
    username: profile.login,
    id: profile.id,
    avatar: profile.avatar_url,
  };
}

async function getGithubEmail(token: string): Promise<string | undefined> {
  const emails = await axios
    .get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then(({ data }) => data);
  return emails[0]?.email;
}
