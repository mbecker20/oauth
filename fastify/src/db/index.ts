import { FastifyInstance } from "fastify";
import mongoose from "mongoose"
import users from "./users";

declare module "fastify" {
  interface FastifyInstance {
    mongoose: typeof mongoose;
  }
}

export default function (app: FastifyInstance) {
  mongoose.connect("mongodb://localhost:27017");
  app.mongoose = mongoose;
  
  users(app);
}