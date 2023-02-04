import { serve, setup } from "swagger-ui-express";
import { temperature } from "./routes/temperature";
import { document } from "./openapi";
import { customCss } from "./swagger";

export const server = temperature.use("/docs", serve).use(
  "/docs",
  setup(document, {
    customCss,
    customSiteTitle: "Temperature API",
  })
);
