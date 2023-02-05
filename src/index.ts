import { serve, setup } from "swagger-ui-express";
import { temperature } from "./routes/temperature";
import { document } from "./spec/openapi";
import { customCss } from "./lib/swagger";

export const server = temperature.use("/docs", serve).use(
  "/docs",
  setup(document, {
    customCss,
    customSiteTitle: "Temperature API",
  })
);

server.listen(3000, () => console.info(`${document.info.title} started`));
