import knex from "knex";
import config from "./knexfile.js";
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
