import { FastifyInstance } from "fastify";
import frontend from "./frontend";
import hello from "./hello";
import oauth from "./oauth";

export default function routes(app: FastifyInstance) {
  frontend(app);
  oauth(app);
  hello(app);
}
