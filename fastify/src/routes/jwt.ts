import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import fastifyJwt from "fastify-jwt";
import { SECRETS } from "../config";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
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
    "authenticate",
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (err) {
        res.send(err);
      }
    }
  );

  app.get("/user", { onRequest: [app.authenticate] }, async (req, res) => {
    const id = req.user.id;
    const user = await app.users.findById(id);
    res.send(user);
  });

  done();
});

export default jwt;
