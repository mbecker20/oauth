import axios from "axios";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyOauth2 from "fastify-oauth2";
import { HOST, SECRETS } from "../../config";

const github = fp((app: FastifyInstance, _: {}, done: () => void) => {
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
    callbackUri: `${HOST}/login/github/callback`,
  });

  app.get("/login/github/callback", async (req, res) => {
    const token = await app.github.getAccessTokenFromAuthorizationCodeFlow(req);
    const profile = await getGithubProfile(token.access_token);
    const existingUser = await app.users.findOne({
      githubID: profile.githubID,
    });
    if (existingUser) {
      const jwt = app.jwt.sign(
        { id: existingUser._id.toString() },
        { expiresIn: token.expires_in }
      );
      res.redirect(`${HOST}/?token=${jwt}`);
    } else {
      const email = await getGithubEmail(token.access_token);
      const createdUser = await app.users.create({
        ...profile,
        email,
      });
      const jwt = app.jwt.sign(
        { id: createdUser._id.toString() },
        { expiresIn: token.expires_in }
      );
      res.redirect(`${HOST}/?token=${jwt}`);
    }
  });

  done();
});

async function getGithubProfile(token: string) {
  const profile = await axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then(({ data }) => data);
  return {
    username: profile.login as string,
    githubID: profile.id as number,
    avatar: profile.avatar_url as string,
  };
}

async function getGithubEmail(token: string) {
  const emails = await axios
    .get("https://api.github.com/user/emails", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then(({ data }) => data);
  return emails[0]?.email as string | undefined;
}

export default github;
