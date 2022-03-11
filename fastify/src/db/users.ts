import { FastifyInstance } from "fastify";
import { Schema, Model } from "mongoose";

declare module "fastify" {
  interface FastifyInstance {
    users: Model<User>;
  }
}

export default function (app: FastifyInstance) {
	const schema = new Schema({
    username: { type: String, unique: true, index: true },
		email: String,
		avatar: String,
		githubID: String,
  });

	app.users = app.mongoose.model("User", schema);
}