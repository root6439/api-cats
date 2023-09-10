import { Router } from "express";
import { userRouter } from "./User.routes";
import { raceRouter } from "./Race.routes";
import { CatRouter } from "./Cat.routes";
import { LoginRouter } from "./Login.routes";

export class AppRouter {
  private router: Router;
  private catRouter: CatRouter;
  private loginRouter: LoginRouter;

  constructor() {
    this.router = Router();
    this.catRouter = new CatRouter();
    this.loginRouter = new LoginRouter();
    this.setRouter();
  }

  setRouter(): void {
    this.router.use("/cats", this.catRouter.getRouter());
    this.router.use("/users", userRouter);
    this.router.use("/login", this.loginRouter.getRouter());
    this.router.use("/races", raceRouter);
  }

  getRouter(): Router {
    return this.router;
  }
}
