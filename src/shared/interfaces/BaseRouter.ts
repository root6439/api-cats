import { Router } from "express";

export abstract class BaseRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }

  getRouter(): Router {
    return this.router;
  }
}
