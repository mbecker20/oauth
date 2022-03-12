import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import frontend from "./frontend";
import hello from "./hello";
import user from "./user";

const index = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app
		.register(frontend)
		.register(user)
		.register(hello);

	done();
});

export default index;