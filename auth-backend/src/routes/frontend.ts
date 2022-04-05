import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyStatic from "fastify-static";

const frontend = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app.register(fastifyStatic, {
    root: "/frontend",
  });
	done();
})

export default frontend;