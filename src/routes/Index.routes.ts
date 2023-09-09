import { Router } from "express";
import { userRouter } from "./User.routes";
import { raceRouter } from "./Race.routes";
import { CatRouter } from "./Cat.routes";

export class AppRouter {
  private router: Router;
  private catRouter: CatRouter;

  constructor() {
    this.router = Router();
    this.catRouter = new CatRouter();
    this.setRouter();
  }

  setRouter(): void {
    this.router.use("/cats", this.catRouter.getRouter());
    this.router.use("/users", userRouter);
    this.router.use("/races", raceRouter);
  }

  getRouter(): Router {
    return this.router;
  }
}
