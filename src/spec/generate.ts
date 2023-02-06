import { format } from "prettier";
import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { document } from "./openapi";

writeFileSync(
  join(process.cwd(), "openapi.json"),
  format(JSON.stringify(document), { parser: "json" })
);
