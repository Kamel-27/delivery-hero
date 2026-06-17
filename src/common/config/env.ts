import { config } from "dotenv";
import z from "zod";
import path from "path";
// Load environment variables from .env file
config({
  path: path.resolve(__dirname, "../../../.env"),
});
const envSchema = z.object({
  PORT: z.string().default("3000"),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.string().default("5432"),
  DB_USER: z.string().default("your_db_user"),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_POOL_MAX: z.string().default("10"),
  MIGRATIONS_DIRECTORY: z.string().default("./src/migrations"),
  MIGRATIONS_EXTENSION: z.string().default("ts"),
  ACCESS_SECRET: z.string(),
  REFRESH_SECRET: z.string(),
  ACCESS_EXPIRES_IN: z.string().default("1h"),
  REFRESH_EXPIRES_IN: z.string().default("7d"),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}
export const env = {
  PORT: Number(parsedEnv.data.PORT),
  database: {
    host: parsedEnv.data.DB_HOST,
    port: Number(parsedEnv.data.DB_PORT),
    user: parsedEnv.data.DB_USER,
    password: parsedEnv.data.DB_PASSWORD,
    name: parsedEnv.data.DB_NAME,
    poolMax: Number(parsedEnv.data.DB_POOL_MAX),
    migrations: {
      directory: path.resolve(__dirname, "../../migrations"),
      extension: parsedEnv.data.MIGRATIONS_EXTENSION,
    },
  },
  jwt: {
    accessSecret: parsedEnv.data.ACCESS_SECRET,
    refreshSecret: parsedEnv.data.REFRESH_SECRET,
    accessExpiresIn: parsedEnv.data.ACCESS_EXPIRES_IN,
    refreshExpiresIn: parsedEnv.data.REFRESH_EXPIRES_IN,
  },
};
