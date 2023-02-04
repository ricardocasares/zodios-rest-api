import supertest from "supertest";
import { server } from "../server";
import { container } from "../container";

const convert = jest
  .fn()
  .mockResolvedValueOnce(98.6)
  .mockResolvedValueOnce(37)
  .mockResolvedValue(37);

container.set("temp", { convert });

test("no parameters", () =>
  supertest(server)
    .get("/temperature")
    .expect(400)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("requires parameter [value]", () =>
  supertest(server)
    .get("/temperature")
    .query({ to: "F" })
    .expect(400)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("default parameter [to=F]", () =>
  supertest(server)
    .get("/temperature")
    .query({ value: 37 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("converts from C to F", () =>
  supertest(server)
    .get("/temperature")
    .query({ to: "C", value: 98.6 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("converts from F to C", () =>
  supertest(server)
    .get("/temperature")
    .query({ to: "C", value: 98.6 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));
