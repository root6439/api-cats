import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/models/Error";

export function handleErrors(error: AppError, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  console.log("caiu nessa porra");
  

  return res.status(error.status).json({
    message: error.message,
    timestamp: error.timestamp,
  });
}
