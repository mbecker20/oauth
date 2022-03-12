import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import fastifyJwt from "fastify-jwt";
import { SECRETS } from "../config";

declare module "fastify" {
  interface FastifyInstance {
    auth: any;
  }
}

declare module "fastify-jwt" {
  interface FastifyJWT {
    payload: {
      id: string;
    };
    user: {
      id: string;
    };
  }
}

const jwt = fp((app: FastifyInstance, _: {}, done: () => void) => {
  app.register(fastifyJwt, {
    secret: SECRETS.JWT.SECRET,
  });

  app.decorate(
    "auth",
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (err) {
        res.status(403);
        res.send("Authorization header malformed or contains invalid JWT");
      }
    }
  );

  app.get("/user", { onRequest: [app.auth] }, async (req, res) => {
    const id = req.user.id;
    const user = await app.users.findById(id);
    res.send(user);
  });

  app.get("/auth_jwt", { onRequest: [app.auth] }, async (req, res) => {
    res.send(req.user.id);
  });

  done();
});

export default jwt;
