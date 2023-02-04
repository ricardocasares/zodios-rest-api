import { Container } from "./container";

const container = new Container({
  test: 1,
});

test("sets initial values", () => expect(container.get("test")).toBe(1));
test("sets initial values", () => {
  container.set("test", 4);
  expect(container.get("test")).toBe(4);
});
