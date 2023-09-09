import { Router } from "express";

export abstract class GenericRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }

  setRouter(): void {}

  getRouter(): Router {
    return this.router;
  }
}
