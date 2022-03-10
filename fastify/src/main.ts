import Fastify from "fastify";
import { PORT } from "./config";

export const fastify = Fastify({
  logger: true,
});

fastify.listen(PORT, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});