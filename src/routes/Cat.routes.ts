import { Router } from "express";
import { CatController } from "../controllers/Cat.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const controller = new CatController();
const catRouter = Router();

// catRouter.use(isAuthenticated);

catRouter.get("/", controller.getAll.bind(controller));
catRouter.get("/:id", controller.getById.bind(controller));
catRouter.post("/", controller.post.bind(controller));
catRouter.put("/:id", controller.put.bind(controller));
catRouter.delete("/:id", controller.delete.bind(controller));

export { catRouter };
