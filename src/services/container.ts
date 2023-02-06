import { Container } from "../lib/container";
import type { Dependencies } from "../lib/models";
import { LocalTemperatureService } from "./localTemperature";

export const container = new Container<Dependencies>({
  temp: new LocalTemperatureService(),
});
