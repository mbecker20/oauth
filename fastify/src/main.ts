import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { PORT } from "./config";
import routes from "./routes";

const app = fastify({
  logger: true,
});

app.register(fastifyCors);

// attach the routes to the app
routes(app);

app.listen(PORT, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
