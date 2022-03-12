import { FastifyInstance } from "fastify";
import fastifyOauth2 from "fastify-oauth2";
import fp from "fastify-plugin";
import { createDecoder } from "fast-jwt"
import { HOST, SECRETS } from "../../config";

declare module "fastify-oauth2" {
  interface OAuth2Token {
    id_token: string;
  }
}

const google = (service?: string, serviceUrl = HOST) =>
  fp((app: FastifyInstance, _: {}, done: () => void) => {
    const name = `google${service ? "-" + service : ""}`;
    app.register(fastifyOauth2, {
      name,
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
      startRedirectPath: `/login/google${service ? "/" + service : ""}`,
      // google redirects here after user logs in
      callbackUri: `${HOST}/login/google/callback${
        service ? "/" + service : ""
      }`,
    });

    app.get(
      `/login/google/callback${service ? "/" + service : ""}`,
      async (req, res) => {
        const token = await app[name].getAccessTokenFromAuthorizationCodeFlow(
          req
        );
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
          res.redirect(`${serviceUrl}/?token=${jwt}`);
        } else {
          // create a user then create jwt with new users _id
          const createdUser = await app.users.create(profile);
          const jwt = app.jwt.sign(
            { id: createdUser._id.toString() },
            { expiresIn: token.expires_in }
          );
          res.redirect(`${serviceUrl}/?token=${jwt}`);
        }
      }
    );

    done();
  });

const decode = createDecoder();

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
