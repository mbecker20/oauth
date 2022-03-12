import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Schema, Model } from "mongoose";

declare module "fastify" {
  interface FastifyInstance {
    users: Model<User>;
  }
}

const users = fp((app: FastifyInstance, _: {}, done: () => void) => {
  const schema = new Schema({
    username: { type: String, index: true },
    email: String,
    avatar: String,
    githubID: { type: Number, index: true },
    googleID: { type: String, index: true },
  });

  app.decorate("users", app.mongoose.model("User", schema));

	done();
});

export default users;