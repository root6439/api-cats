import { Router } from "express";
import { catRouter } from "./Cat.routes";
import { loginRouter } from "./Login.routes";
import { handleErrors } from "../middlewares/handleErrors";

let routes = Router();

routes.use("/cats", catRouter);
routes.use("/users", loginRouter);

export { routes };
