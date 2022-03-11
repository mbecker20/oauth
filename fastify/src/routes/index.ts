import { FastifyInstance } from "fastify";
import frontend from "./frontend";
import hello from "./hello";
import jwt from "./jwt";
import oauth from "./oauth";

export default function (app: FastifyInstance) {
  frontend(app);
  oauth(app);
  jwt(app);
  hello(app);
}
