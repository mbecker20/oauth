import { FastifyInstance } from "fastify";

export default function (app: FastifyInstance) {
  app.get("/hello", { onRequest: [app.authenticate] }, (_, res) => {
    res.send("hello world");
  });
}