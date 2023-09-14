import { userRouter } from "./User.routes";
import { raceRouter } from "./Race.routes";
import { CatRouter } from "./Cat.routes";
import { LoginRouter } from "./Login.routes";
import { BaseRouter } from "../shared/interfaces/BaseRouter";

export class AppRouter extends BaseRouter {
  private catRouter: CatRouter;
  private loginRouter: LoginRouter;

  constructor() {
    super();
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
}
