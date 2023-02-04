import { document as spec } from "./openapi";

test("spec matches snapshot", () => expect(spec).toMatchSnapshot());
