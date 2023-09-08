import { Router } from "express";
import { LoginController } from "../controllers/Login.controller";
import { Joi, Segments, celebrate } from "celebrate";

const controller = new LoginController();
const loginRouter = Router();

loginRouter.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      login: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  controller.login.bind(controller)
);
loginRouter.post(
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
loginRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().allow(""),
    },
  }),
  controller.getAll.bind(controller)
);

export { loginRouter };
