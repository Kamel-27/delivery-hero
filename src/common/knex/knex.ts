import knex from "knex";
import { env } from "../config/env.js";
import type { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    host: env.database.host,
    port: env.database.port,
    user: env.database.user,
    password: env.database.password,
    database: env.database.name,
  },
  pool: { min: 0, max: env.database.poolMax },
  migrations: {
    directory: "./src/migrations",
    extension: "ts",
  },
};
export const db = knex(config);
export async function testConnection() {
  try {
    await db.raw("SELECT 1+1 AS result");
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}
