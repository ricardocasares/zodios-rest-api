import { server } from "./server";
import { document } from "./openapi";

server.listen(3000, () => console.info(`${document.info.title} started`));
