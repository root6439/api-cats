import { DataSource } from "typeorm";
import { Race } from "./entities/Race.entity";
import { Cat } from "./entities/Cat.entity";
import { User } from "./entities/User.entity";
import { Address } from "./entities/Address.entity";
import { DataMock } from "../shared/mocks/Data.mock";
import { Environment } from "../shared/Enums/Environment.enum";
import { Role } from "./entities/Roles.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.host,
  port: 3306,
  username: "root",
  password: "1234",
  database: "agropecuaria",
  synchronize: true,
  logging: true,
  entities: [Race, Cat, User, Address, Role],
  subscribers: [],
  migrations: [],
  dropSchema: true,
});

AppDataSource.initialize()
  .then(async () => {
    if (process.env.environment == Environment.DEV) {
      await DataMock.createDataMocks();
    }
    // console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    // console.error(err);
  });
