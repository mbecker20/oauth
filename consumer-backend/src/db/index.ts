import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import mongoose, { Model } from "mongoose"
import users from "./users";
import { User } from "@oauth2/types";

declare module "fastify" {
  interface FastifyInstance {
    mongoose: typeof mongoose;
    users: Model<User>;
  }
}

const db = fp((app: FastifyInstance, _: {}, done: () => void) => {
  mongoose.connect("mongodb://localhost:27017/oauth");

  app
    .decorate("mongoose", mongoose)
    .register(users);

  done();
});

export default db;