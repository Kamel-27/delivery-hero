import { Router } from "express";
import { authenticate } from "../../common/auth/guard.js";
import { UserController } from "./controller/user.controller.js";
import { userService } from "./service/user.service.js";

export const router = Router();
const userController = new UserController(userService);

router.get("/me", authenticate, userController.getMe);
export const userRouter = router;