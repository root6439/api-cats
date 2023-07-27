import { NextFunction, Request, Response } from "express";
import authConfig from "../config/auth";
import { verify } from "jsonwebtoken";
import { AppError } from "../shared/models/Error";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(403, "Usuário não autenticado.");
  }

  const token = authHeader.split(" ")[1] ?? "";

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError(401, "Token inválido.");
  }
}
