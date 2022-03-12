import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import github from "./github";
import google from "./google";

const oauth = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app
		.register(github(undefined))
		.register(github("consumer", "http://localhost:3000"))
		.register(google())
		.register(google("consumer", "http://localhost:3000"));

	done();
});

export default oauth;