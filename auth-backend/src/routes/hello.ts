import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const hello = fp((app: FastifyInstance, _: {}, done: () => void) => {
  app.get("/hello", { onRequest: [app.auth] }, (_, res) => {
    res.send("hello world");
  });
  done();
});

export default hello;
