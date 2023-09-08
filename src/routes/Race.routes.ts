import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { RaceController } from "../controllers/Race.controller";

const controller = new RaceController();
const raceRouter = Router();
raceRouter.use(isAuthenticated);

raceRouter.post("/", controller.post.bind(controller));

export { raceRouter };
