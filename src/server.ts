import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import { routes } from "./routes/Index.routes";
import express from "express";
import { handleErrors } from "./middlewares/handleErrors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(handleErrors);

app.listen(3000, () => {
  console.log("Server on");
});
