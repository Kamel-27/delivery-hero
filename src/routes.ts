import { Router } from "express";
import { healthRouter } from "./app/health/health.routes.js";
import { authRouter } from "./app/auth/routes.js";
export const router = Router();
router.use("/health", healthRouter);
router.use('/auth', authRouter);