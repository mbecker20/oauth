import { FastifyInstance } from "fastify";

export default function hello(app: FastifyInstance) {
  app.get("/hello", (_, res) => {
    res.send("hello world");
  });
}
