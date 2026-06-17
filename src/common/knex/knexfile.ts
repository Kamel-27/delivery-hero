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
    directory: env.database.migrations.directory,
    extension: env.database.migrations.extension,
  },
};

export default config;
export const development = config;
export const production = config;
