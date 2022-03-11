import { FastifyInstance } from "fastify";
import fastifyOauth2, { OAuth2Namespace } from "fastify-oauth2";
import { PORT, SECRETS } from "../config";

declare module "fastify" {
  interface FastifyInstance {
    github: OAuth2Namespace;
  }
}

export default function oauth(app: FastifyInstance) {
  app.register(fastifyOauth2, {
    name: "github",
    scope: [], // empty for only basic access to acct, ie info that is is already public about your acct.
    credentials: {
      client: {
        id: SECRETS.GITHUB.ID,
        secret: SECRETS.GITHUB.SECRET,
      },
      auth: fastifyOauth2.GITHUB_CONFIGURATION,
    },
    // hit this path to
    startRedirectPath: "/login/github",
    // redirect here after user logs in
    callbackUri: "http://localhost:2020/login/github/callback",
  });

  app.get("/login/github/callback", async (req, res) => {
    const token = await app.github.getAccessTokenFromAuthorizationCodeFlow(req);
		res.redirect(`http://localhost:${PORT}/?token=${token.access_token}`);
  });
}
