import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import { routes } from "./routes/Index.routes";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./shared/models/Error";
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
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

app.listen(3000, () => {
  console.log("Server on");
});
