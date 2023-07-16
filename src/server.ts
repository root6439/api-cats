import express, { NextFunction, Request, Response, Router } from "express";
import { Cat } from "./shared/models/Cat";
import cors from "cors";

let cats: Cat[] = [
  { id: 1, name: "Cesar", length: 0.3, weight: 4.0, race: "Ciamês" },
  { id: 2, name: "Augusto", length: 0.5, weight: 4.0, race: "Persa" },
  { id: 3, name: "Ronaldo", length: 0.1, weight: 4.0, race: "Burmês" },
  { id: 4, name: "Gato", length: 0.2, weight: 4.0, race: "Bengal" },
  { id: 5, name: "Farofa", length: 0.8, weight: 4.0, race: "Abissínio" },
];

function genId(cats: Cat[]): number {
  return cats.length > 0 ? Math.max(...cats.map((cats) => cats.id)) + 1 : 11;
}

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

router.get("/cats", (req: Request, res: Response) => {
  let response: Cat[] = cats;

  let search = String(req.query.search);

  console.log(search);

  if (search) {
    response = cats.filter((value) => {
      return value.name.toLowerCase().includes(search.toLowerCase());
    });

    // response = response.concat(
    //   ...cats.filter((value) => {
    //     return value.race.toLowerCase().includes(search);
    //   })
    // );
  }

  return res.status(200).json(response);
});

router.get("/cats/:id", (req: Request, res: Response) => {
  let cat = cats.find((value) => value.id == Number(req.params.id));

  return res.status(200).json(cat);
});

router.post("/cats", (req: Request, res: Response) => {
  console.log(req.body);

  let cat: Cat = {
    id: genId(cats),
    length: req.body.length,
    name: req.body.name,
    race: req.body.race,
    weight: req.body.weight,
  };

  cats.push(cat);

  return res.status(201).json(cat);
});

router.put("/cats/:id", (req: Request, res: Response) => {
  let catId = cats.findIndex((value) => value.id == Number(req.params.id));

  cats[catId] = req.body;

  return res.status(200).json(cats[catId]);
});

router.delete("/cats/:id", (req: Request, res: Response) => {
  let catId = cats.findIndex((value) => value.id == Number(req.params.id));

  cats.splice(catId, 1);

  return res.status(200).json();
});

router.post("/login", (req: Request, res: Response) => {
  let { login, password } = req.body;

  if (login == "cat@gmail.com" && password == "cat123") {
    return res.status(401).json({ auth: true });
  } else {
    return res.status(401).json({ auth: false });
  }
});

app.use(router);

app.listen(3000, () => {
  console.log("Server on");
});
