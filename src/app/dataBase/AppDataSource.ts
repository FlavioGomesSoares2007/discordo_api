import "dotenv/config"
import { DataSource } from "typeorm";
import { User } from "../models/User.Entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_NAME,
  password: process.env.DB_SENHA,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

try {
  AppDataSource.initialize();
} catch (error) {
  console.log(`error ao conectar com o banco de dados ${error}`);
}
