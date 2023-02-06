import { Container } from "./container";

class Child {
  constructor() {}
}

class Parent {
  constructor(public child: Child) {}
}

interface Deps {
  test: number;
  child: Child;
  parent: Parent;
}

const container = new Container<Deps>();

test("sets initial values", () =>
  expect(container.set("test", () => 1).get("test")).toBe(1));

test("gets a value from the container", () =>
  expect(container.get("test")).toBe(1));

test("it chains set method", () =>
  expect(container.set("test", () => 2).set("test", () => 3)).toBeInstanceOf(
    Container
  ));

test("it throws when key doesn't exists", () =>
  expect(() =>
    container
      // @ts-ignore
      // The key {wrong} deliberately doesn't exists
      .get("wrong")
  ).toThrowError("Key 'wrong' not found inside the container"));

test("it resolves dependency's dependencies", () =>
  expect(
    container
      .set("child", () => new Child())
      .set("parent", (get) => new Parent(get("child")))
      .get("parent").child
  ).toBeInstanceOf(Child));
