import { Container } from "./container";

const container = new Container({
  test: 1,
});

test("gets a value from the container", () =>
  expect(container.get("test")).toBe(1));

test("sets initial values", () => {
  container.set("test", 2);
  expect(container.get("test")).toBe(2);
});

test("it chains set method", () => {
  const self = container.set("test", 3).set("test", 4);

  expect(self).toBeInstanceOf(Container);
  expect(container.get("test")).toBe(4);
});
