import { isAuthenticated } from "../middlewares/isAuthenticated";
import { RaceController } from "../controllers/Race.controller";
import { BaseRouter, RouterConfig } from "../shared/interfaces/BaseRouter";

export class RaceRouter extends BaseRouter implements RouterConfig {
  private controller: RaceController;

  constructor() {
    super();
    this.controller = new RaceController();
  }

  setRouter(): void {
    this.router.use(isAuthenticated);
    this.router.get("/", this.controller.getAll.bind(this.controller));
    this.router.post("/", this.controller.post.bind(this.controller));
  }
}
