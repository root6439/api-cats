import { Router } from "express";

export interface RouterConfig {
  getRouter(): Router;
  setRouter(): void;
}

export abstract class BaseRouter {
  router: Router;

  constructor() {
    this.router = Router();
  }

  getRouter(): Router {
    return this.router;
  }
}
