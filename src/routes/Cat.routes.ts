import { Router } from "express";
import { CatController } from "../controllers/Cat.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { celebrate, Segments, Joi } from "celebrate";

const controller = new CatController();
const catRouter = Router();
catRouter.use(isAuthenticated);

catRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().allow(""),
    },
  }),
  controller.getAll.bind(controller)
);

// catRouter.get("/races", controller.getRaces.bind(controller));

catRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
  }),
  controller.getById.bind(controller)
);

catRouter.post(
  "/",
  
  controller.post.bind(controller)
);

catRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      length: Joi.number().required(),
      weight: Joi.number().required(),
      birth: Joi.date().required(),
      gender: Joi.string().required(),
      races: Joi.array().required(),
    }),
  }),
  controller.put.bind(controller)
);

catRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.number().required() },
  }),
  controller.delete.bind(controller)
);

export { catRouter };
