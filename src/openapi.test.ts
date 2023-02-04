import { document } from "@app/openapi";

test("openapi matches snapshot", expect(document).toMatchSnapshot);
