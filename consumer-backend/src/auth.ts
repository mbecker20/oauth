import axios from "axios";
import { FastifyRequest, FastifyReply } from "fastify";
import { AUTH_URL } from "./config";

declare module "fastify" {
  interface FastifyRequest {
    userID: string;
  }
}

const auth = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  try {
    req.userID = await axios.get(AUTH_URL, {
      headers: {
        Authorization: req.headers.authorization!,
      },
    }).then(({ data }) => data);
  } catch {
    res.status(403);
    res.send("Authorization header malformed or contains invalid JWT");
  }
};

export default auth;