import { Router } from "express";
import { LoginController } from "../controllers/Login.controller";

const controller = new LoginController();
const loginRouter = Router();

loginRouter.post("/login", controller.login.bind(controller));
loginRouter.post("/", controller.register.bind(controller));
loginRouter.get("/", controller.getAll.bind(controller));

export { loginRouter };
