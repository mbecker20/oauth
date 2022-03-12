import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import auth from "../auth";

const hello = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app.get("/hello", { onRequest: [auth] }, async (_, res) => {
		res.send("hello world")
	})
	done();
});

export default hello;