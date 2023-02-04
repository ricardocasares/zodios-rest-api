import { serve, setup } from "swagger-ui-express";
import { app } from "@app/app";
import { document } from "@app/openapi";
import { customCss } from "@app/swagger";

app.use("/docs", serve).use(
  "/docs",
  setup(document, {
    customCss,
    customSiteTitle: "Temperature API",
  })
);

app.listen(3000, () => console.info(`${document.info.title} started`));
