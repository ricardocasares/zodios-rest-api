import { LocalTemperatureService } from "./localTemperature";

const temp = new LocalTemperatureService();

test("converts from [F] to [C]", async () =>
  expect(await temp.convert("C", 98.6)).toBe(37));
test("converts from [C] to [F]", async () =>
  expect(await temp.convert("F", 37)).toBe(98.6));
