import { DataSource } from "typeorm";
import { Race } from "./entities/Race.entity";
import { Cat } from "./entities/Cat.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "1234",
  database: "agropecuaria",
  synchronize: true,
  logging: true,
  entities: [Race, Cat],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error(err);
  });
