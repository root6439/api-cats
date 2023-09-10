import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import { LoginController } from "../controllers/Login.controller";
import { BaseRouter } from "../shared/interfaces/BaseRouter";

export class LoginRouter extends BaseRouter {
  private loginRouter: Router;
  private controller: LoginController;

  constructor() {
    super();
    this.loginRouter = Router();
    this.controller = new LoginController();
    this.setRouter();
  }

  setRouter(): void {
    this.loginRouter.post(
      "/",
      celebrate({
        [Segments.BODY]: {
          login: Joi.string().required(),
          password: Joi.string().required(),
        },
      }),
      this.controller.login.bind(this.controller)
    );
  }

  getRouter(): Router {
    return this.loginRouter;
  }
}
