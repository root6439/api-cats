import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/models/Error";

export function handleErrors(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: error.message,
      timestamp: new Date().getTime(),
    });
  }

  console.log(error);
  console.log(" opaopaopaopap");

  return res.status(500).json({
    message: "Internal server error",
    timestamp: new Date().getTime(),
  });
}
