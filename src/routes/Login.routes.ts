import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import { LoginController } from "../controllers/Login.controller";

export class LoginRoutes {
  private loginRouter: Router;
  private controller: LoginController;

  constructor() {
    this.loginRouter = Router();
    this.controller = new LoginController();
  }

  setRouter(): void {
    this.loginRouter.post(
      "/login",
      celebrate({
        [Segments.BODY]: {
          login: Joi.string().required(),
          password: Joi.string().required(),
        },
      }),
      this.controller.login
    );
  }

  getRouter(): Router {
    return this.loginRouter;
  }
}
