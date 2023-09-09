import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { Joi, Segments, celebrate } from "celebrate";

const controller = new UserController();
const userRouter = Router();

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
      address: {
        cep: Joi.number().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        neighborhood: Joi.string().required(),
        state: Joi.string().required(),
        number: Joi.number().required(),
      },
    },
  }),
  controller.register.bind(controller)
);

userRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().allow(""),
    },
  }),
  controller.getAll.bind(controller)
);

export { userRouter };
