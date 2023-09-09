import { CatController } from "../controllers/Cat.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { celebrate, Segments, Joi } from "celebrate";
import { GenericRouter } from "../shared/interfaces/Router.interface";

export class CatRouter extends GenericRouter {
  private controller: CatController;

  constructor() {
    super();
    this.controller = new CatController();
    this.setRouter();
  }

  setRouter(): void {
    this.router.use(isAuthenticated);

    this.router.get(
      "/",
      celebrate({
        [Segments.QUERY]: {
          search: Joi.string().allow(""),
        },
      }),
      this.controller.getAll.bind(this.controller)
    );

    this.router.get(
      "/:id",
      celebrate({
        [Segments.PARAMS]: { id: Joi.number().required() },
      }),
      this.controller.getById.bind(this.controller)
    );

    this.router.post("/", this.controller.post.bind(this.controller));

    this.router.put(
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
      this.controller.put.bind(this.controller)
    );

    this.router.delete(
      "/:id",
      celebrate({
        [Segments.PARAMS]: { id: Joi.number().required() },
      }),
      this.controller.delete.bind(this.controller)
    );
  }
}
