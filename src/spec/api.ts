import { z } from "zod";
import { apiBuilder, makeParameters, makeErrors } from "@zodios/core";
import { scales } from "../lib/models";

const parameters = makeParameters([
  {
    name: "to",
    description: "Target scale",
    schema: scales.default("F"),
    type: "Query",
  },
  {
    name: "value",
    description: "Units",
    schema: z.number(),
    type: "Query",
  },
]);

const errors = makeErrors([
  {
    status: "default",
    schema: z.object({
      message: z.string(),
    }),
    description: "Default error",
  },
]);

const response = z.object({
  scale: scales,
  value: z.number(),
});

export const spec = apiBuilder({
  method: "get",
  path: "/temperature",
  alias: "convertDegrees",
  description: "Temperature conversion",
  response,
  errors,
  parameters,
}).build();
