import { z } from "zod";

export const scales = z.enum(["F", "C"]);
export type Scales = z.infer<typeof scales>;
