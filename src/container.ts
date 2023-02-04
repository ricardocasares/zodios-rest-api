import { Container } from "./lib/container";
import { LocalTemperatureService } from "./services/localTemperature";
import type { TemperatureService } from "./models";

export const container = new Container({
  temp: new LocalTemperatureService() as TemperatureService,
});
