import { Router } from "express";
import { testConnection } from "../../common/knex/knex.js";
export const healthRouter = Router();
healthRouter.get("/", async (req, res) => {
  try {
    await testConnection();
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Database connection failed" });
  }
});
