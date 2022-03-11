import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import frontend from "./frontend";
import hello from "./hello";
import jwt from "./jwt";
import oauth from "./oauth";

const routes = fp((app: FastifyInstance, _: {}, done: () => void) => {
  app
    .register(frontend)
    .register(oauth)
    .register(jwt)
    .register(hello);

  done();
});

export default routes;
