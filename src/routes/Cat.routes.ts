import { Router } from "express";
import { CatController } from "../controllers/Cat.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const controller = new CatController();
const catRouter = Router();

catRouter.use(isAuthenticated);

catRouter.get("/cats", controller.getAll);
catRouter.get("/cats/:id", controller.getById);
catRouter.post("/cats", controller.post);
catRouter.put("/cats/:id", controller.put);
catRouter.delete("/cats/:id", controller.delete);

export { catRouter };
