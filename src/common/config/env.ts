import { config } from "dotenv";
import z from "zod";

// Load environment variables from .env file
config();
const envSchema = z.object({
  PORT: z.string().default("3000"),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.string().default("5432"),
  DB_USER: z.string().default("your_db_user"),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_POOL_MAX: z.string().default("10"),
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
  },
};
