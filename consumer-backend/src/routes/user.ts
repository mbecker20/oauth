import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import auth from "../auth";

const user = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app.get("/user", { onRequest: [auth] }, async (req, res) => {
		const user = await app.users.findById(req.userID);
		res.send(user);
	});
	done();
});

export default user;