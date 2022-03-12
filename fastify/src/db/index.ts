import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import mongoose from "mongoose"
import users from "./users";

declare module "fastify" {
  interface FastifyInstance {
    mongoose: typeof mongoose;
  }
}

const db = fp((app: FastifyInstance, _: {}, done: () => void) => {
  mongoose.connect("mongodb://localhost:27017/oauth");
  app.decorate("mongoose", mongoose)

  app.register(users);
  
  done();
});

export default db;