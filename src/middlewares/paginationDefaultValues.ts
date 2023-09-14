import { NextFunction, Request, Response } from "express";

export function pagination(req: Request, res: Response, next: NextFunction): void {
  let params = req.query;

  req.query.page = params.page ?? "1";
  req.query.offset = params.offset ?? "5";
  req.query.orderBy = params.orderBy ?? "name";
  req.query.direction = params.direction ?? "ASC";

  return next();
}
