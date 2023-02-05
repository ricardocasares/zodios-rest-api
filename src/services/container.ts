import { Container } from "../lib/container";
import { LocalTemperatureService } from "./localTemperature";
import type { TemperatureService } from "../lib/models";

export const container = new Container({
  temp: new LocalTemperatureService() as TemperatureService,
});
