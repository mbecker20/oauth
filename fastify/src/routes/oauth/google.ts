import { FastifyInstance } from "fastify";
import fastifyOauth2 from "fastify-oauth2";
import fp from "fastify-plugin";
import { createDecoder } from "fast-jwt"
import { PORT, SECRETS } from "../../config";

declare module "fastify-oauth2" {
  interface OAuth2Token {
    id_token: string;
  }
}

const decode = createDecoder();

const google = fp((app: FastifyInstance, _: {}, done: () => void) => {
  app.register(fastifyOauth2, {
    name: "google",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ], // the access level this app has to users acct info
    credentials: {
      client: {
        id: SECRETS.GOOGLE.ID,
        secret: SECRETS.GOOGLE.SECRET,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    // location.replace this route to redirect to google
    startRedirectPath: "/login/google",
    // google redirects here after user logs in
    callbackUri: "http://localhost:2020/login/google/callback",
  });

  app.get("/login/google/callback", async (req, res) => {
    const token = await app.google.getAccessTokenFromAuthorizationCodeFlow(req);
    // get user info by decoding id token
    const profile = getGoogleProfile(token.id_token);
    // check to see if user already exists
    const existingUser = await app.users.findOne({
      googleID: profile.googleID,
    });
    if (existingUser) {
      // create the jwt with the user _id (on our db) as payload
      const jwt = app.jwt.sign(
        { id: existingUser._id.toString() },
        { expiresIn: token.expires_in }
      );
      res.redirect(`http://localhost:${PORT}/?token=${jwt}`);
    } else {
      // create a user then create jwt with new users _id
      const createdUser = await app.users.create(profile);
      const jwt = app.jwt.sign(
        { id: createdUser._id.toString() },
        { expiresIn: token.expires_in }
      );
      res.redirect(`http://localhost:${PORT}/?token=${jwt}`);
    }
  });

  done();
});

export function getGoogleProfile(id_token: string) {
  const profile = decode(id_token);
  return {
    googleID: profile.sub as string,
    email: profile.email as string,
    username: profile.email.split("@")[0] as string,
    avatar: profile.picture as string
  }
}

export default google;
