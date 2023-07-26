import express, { NextFunction, Request, Response, Router } from "express";
import cors from "cors";
import { catRouter } from "./routes/Cat.routes";

const app = express();
app.use(express.json());
app.use(cors());
let router = Router();

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization || req.url == "/login") {
    next();
  }

  return res.status(401).json({
    status: "auth_error",
    message: "Erro de autenticação",
  });
});

app.use(router);
app.use(catRouter);

app.listen(3000, () => {
  console.log("Server on");
});
