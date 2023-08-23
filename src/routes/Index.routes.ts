import { Router } from "express";
import { catRouter } from "./Cat.routes";
import { loginRouter } from "./Login.routes";

let routes = Router();

routes.use("/cats", catRouter);
routes.use("/users", loginRouter);

export { routes };
