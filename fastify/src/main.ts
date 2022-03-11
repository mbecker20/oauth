import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { PORT } from "./config";
import db from "./db";
import routes from "./routes";

const app = fastify({
  logger: true,
});

app.register(fastifyCors);

// attach db (mongoose)
db(app);

// attach the routes to the app
routes(app);

app.listen(PORT, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
