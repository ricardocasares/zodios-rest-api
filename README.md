# Zodios API example

This is an attempt to build a fully functional REST API with minimal boilerplate.

### Features

- Automatic OpenAPI documentation
- Fully typed REST endpoints with intellisense
- Typed middleware contexts

### Tooling

- Zodios
- Transpiling with SWC
- Jest for testing

### TODO

#### Dependency Injection

I want to try a very simple way of doing dependency injection. The basic principle is to use the `app.set("key", value)` express API.

```ts
// app.ts
import express from "express";
import { router } from "./router";
import { UserService } "./repositories";

const app = express().use(router);

app.set("users", new UserService());

app.listen(3000);
```

And inside your router, you have access to the application setting via the `req` object:

```ts
// router.ts
import { Router } from "express";

export const router = new Router().get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await req.app.get("users").find(id);

  res.status(200).json(user);
});
```

This way you could mock the dependencies very easily on your tests:

```ts
// app.test.ts
import st from "supertest";
import { app } from "./app";

const usersMock = jest.fn(() => ({
  find: jest.fn().mockRejectedValue(1),
}));

app.set("users", usersMock);

test("GET /users/1 retrieves a user", () =>
  st(app).get("/users/1").expect(200, { user: 1 }));
```

The downside is that `app.set` does not convey type information across the application, so basically the call to `app.get` is not typed, at least by default. It _should_ be possible to statically type it on the `Application` interface, otherwise, for this simple example I'd be satisfied with `app.get("users") as UserService`.
