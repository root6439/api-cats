import { Router } from "express";
import { catRouter } from "./Cat.routes";
import { loginRouter } from "./Login.routes";
import { raceRouter } from "./Race.routes";

let routes = Router();

routes.use("/cats", catRouter);
routes.use("/users", loginRouter);
routes.use("/races", raceRouter);

export { routes };
