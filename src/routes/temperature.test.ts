import supertest from "supertest";
import { container } from "../services/container";
import { temperature } from "./temperature";

const convert = jest
  .fn()
  .mockResolvedValueOnce(98.6)
  .mockResolvedValueOnce(37)
  .mockResolvedValue(37);

container.set("temp", { convert });

test("no parameters", () =>
  supertest(temperature)
    .get("/temperature")
    .expect(400)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("requires parameter [value]", () =>
  supertest(temperature)
    .get("/temperature")
    .query({ to: "F" })
    .expect(400)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("default parameter [to=F]", () =>
  supertest(temperature)
    .get("/temperature")
    .query({ value: 37 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("converts from C to F", () =>
  supertest(temperature)
    .get("/temperature")
    .query({ to: "C", value: 98.6 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("converts from F to C", () =>
  supertest(temperature)
    .get("/temperature")
    .query({ to: "C", value: 98.6 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));
