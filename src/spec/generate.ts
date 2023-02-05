import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { document } from "./openapi";

writeFileSync(
  join(process.cwd(), "openapi.json"),
  JSON.stringify(document, null, 2)
);
