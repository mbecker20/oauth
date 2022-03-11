import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const hello2 = fp((app: FastifyInstance, _: {}, done: () => void) => {
  app.get("/hello2", { onRequest: [app.authenticate] }, (_, res) => {
    res.send("hello second world");
  });
  done();
});

export default hello2;
