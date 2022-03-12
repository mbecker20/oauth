import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import github from "./github";
import google from "./google";

const oauth = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app
		.register(github(undefined))
		.register(github("consumer"))
		.register(google())
		.register(google("consumer"));

	done();
});

export default oauth;