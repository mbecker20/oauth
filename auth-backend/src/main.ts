import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { PORT } from "./config";
import db from "./db";
import routes from "./routes";

const app = fastify({ logger: false })
  .register(fastifyCors)
  .register(db)
  .register(routes);

app.listen(PORT, "0.0.0.0", (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`auth-backend listening at ${address}`);
});
