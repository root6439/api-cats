import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { AppError } from "./shared/models/Error";
import { errors } from "celebrate";
import { AppRouter } from "./routes/Index.routes";

class App {
  express: Express;
  router: AppRouter;

  constructor() {
    this.express = express();
    this.router = new AppRouter();
    this.setConfigs();
  }

  setConfigs(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(this.router.getRouter());
    this.express.use(errors());

    //middleware handler errors
    this.express.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(error);

      let statusCode = 500;
      let message = "Não foi possível executar a operação. Tente novamente.";

      if (error instanceof AppError) {
        statusCode = error.status;
        message = error.message;
      }

      return res.status(statusCode).json({
        message,
        timestamp: new Date().getTime(),
        endpoint: req.baseUrl + req.path,
        method: req.method,
        queryParams: req.query,
        body: req.body,
      });
    });
  }

  start() {
    this.express.listen(3000, () => {
      console.log("Server on");
    });
  }
}

new App().start();
