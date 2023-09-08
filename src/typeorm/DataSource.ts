import { DataSource } from "typeorm";
import { Race } from "./entities/Race.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [Race],
  subscribers: [],
  migrations: [],
});
