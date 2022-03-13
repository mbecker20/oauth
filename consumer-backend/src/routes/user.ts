import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import auth from "../auth";

const user = fp((app: FastifyInstance, _: {}, done: () => void) => {
	app.get("/user", { onRequest: [auth] }, async (req, res) => {
		const user = await app.users.findById(req.userID);
    if (user) {
      delete user.password;
      res.send(user);
    } else {
      res.status(400);
      res.send("User could not be found");
    }
	});
	done();
});

export default user;