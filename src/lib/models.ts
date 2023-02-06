import { z } from "zod";

export const scales = z.enum(["F", "C"]);
export type Scales = z.infer<typeof scales>;

export interface TemperatureService {
  convert(to: Scales, value: number): Promise<number>;
}

export type Dependencies = {
  temp: TemperatureService;
};
