import { FastifyInstance } from "fastify";
import fastifyJwt from "fastify-jwt";
import { SECRETS } from "../config";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

export default function (app: FastifyInstance) {
	app.register(fastifyJwt, {
    secret: SECRETS.JWT.SECRET,
  });

	app.decorate("authenticate", async (req, res) => {
		try {
			await req.jwtVerify();
		} catch (err) {
			res.send(err);
		}
	})
}