import { FastifyInstance } from "fastify";
import { OAuth2Namespace } from "fastify-oauth2";
import fp from "fastify-plugin";
import github from "./github";
import google from "./google";

declare module "fastify" {
  interface FastifyInstance {
    github: OAuth2Namespace;
		google: OAuth2Namespace;
  }
}

const oauth = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app
		.register(github)
		.register(google);

	done();
});

export default oauth;