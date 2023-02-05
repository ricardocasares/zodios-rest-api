import { openApiBuilder } from "@zodios/openapi";
import { spec } from "./api";

export const document = openApiBuilder({
  title: "Farenheit to Celsius API",
  version: "1.0.0",
  description: "A simple temperature converter",
})
  .addServer({ url: "/" })
  .addPublicApi(spec)
  .build();
