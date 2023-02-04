import supertest from "supertest";
import { app } from "@app/app";

test("no parameters", () =>
  supertest(app)
    .get("/temperature")
    .expect(400)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("default parameter value: to", () =>
  supertest(app)
    .get("/temperature")
    .query({ value: 37 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("requires parameter: value", () =>
  supertest(app)
    .get("/temperature")
    .query({ to: "F" })
    .expect(400)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("converts from C to F", () =>
  supertest(app)
    .get("/temperature")
    .query({ to: "C", value: 98.6 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));

test("converts from F to C", () =>
  supertest(app)
    .get("/temperature")
    .query({ to: "C", value: 98.6 })
    .expect(200)
    .expect(({ body }) => expect(body).toMatchSnapshot()));
