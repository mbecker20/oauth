import { FastifyInstance } from "fastify";
import fastifyStatic from "fastify-static";
import { resolve } from "path";

export default function (app: FastifyInstance) {
	app.register(fastifyStatic, {
		root: resolve("../frontend/build")
	})
}