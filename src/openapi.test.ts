import { document as spec } from "@app/openapi";

test("spec matches snapshot", () => expect(spec).toMatchSnapshot());
