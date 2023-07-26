import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const dbConnection = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3307,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  migrations: ["src/database/migrations/*.{js,ts}"],
  logging: false,
  synchronize: true,
  subscribers: [],
});
