import fastify from "fastify";
import fastifyCors from "fastify-cors";
import { PORT } from "./config";
import db from "./db";
import routes from "./routes";

const app = fastify({
  logger: true,
})
  .register(fastifyCors)
  .register(db)
  .register(routes);
  
app.listen(PORT, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
