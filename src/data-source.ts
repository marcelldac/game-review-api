import "reflect-metadata";
import { DataSource } from "typeorm";

import { Game } from "./entities/Game";
import { Review } from "./entities/Review";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "game-review-admin",
  password: "game-review",
  database: "games",
  synchronize: true,
  logging: true,
  entities: [Game, Review],
  migrations: ["./src/migration/**.ts"],
  subscribers: [],
});
