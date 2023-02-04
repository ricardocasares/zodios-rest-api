import { z } from "zod";

const env = z.object({
  NODE_ENV: z.enum(["test", "production", "development"]),
});

export const { NODE_ENV } = env.parse(process.env);
