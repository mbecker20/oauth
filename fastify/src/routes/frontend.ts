import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyStatic from "fastify-static";
import { resolve } from "path";

const frontend = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app.register(fastifyStatic, {
    root: resolve("../frontend/build"),
  });
	done();
})

export default frontend;