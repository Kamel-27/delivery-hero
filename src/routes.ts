import { Router } from "express";
import { healthRouter } from "./app/health/health.routes.js";
import { authRouter } from "./app/auth/routes.js";
import { userRouter } from "./app/user/routes.js";
export const router = Router();
router.use("/health", healthRouter);
router.use("/user", userRouter);
router.use('/auth', authRouter);