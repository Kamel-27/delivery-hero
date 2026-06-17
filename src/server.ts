import http from "http";
import express from "express";
import { createApp } from "./app.js";
import { env } from "./common/config/env.js";
import { db, testConnection } from "./common/knex/knex.js";

const app = createApp();
const server = http.createServer(app);
server.listen(env.PORT, async () => {
  console.log(`Server is running on port ${env.PORT}`);
  try {
    await testConnection();
  } catch (error) {
    console.error("Warning: Server started but database connection failed.");
  }
});
async function shutdown() {
  server.close(async () => {
    console.log("Database shutdown");
    await db.destroy();
    process.exit(0);
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
