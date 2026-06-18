import { NextFunction, Request, Response } from "express";
import { validateBody } from "../../../common/validation/validate";
import { ForgotPasswordDTO, LoginDTO, RegisterDTO, ResetPasswordDTO } from "../dto/auth.dto";
import { AuthService, authService } from "../service/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. validate req.body
      const data = await validateBody(RegisterDTO, req.body);
      // 2. call service
      const result = await this.authService.register(data);
      // 3. respond
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. validate req.body
      const data = await validateBody(LoginDTO, req.body);
      // 2. call service
      const result = await this.authService.login(data);
      // 3. respond
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. validate req.body
      const data = await validateBody(ForgotPasswordDTO, req.body);
      // 2. call service
      await this.authService.forgotPassword(data);
      // 3. respond
      res
        .status(200)
        .json({ message: "If the email exists, an OTP has been sent." });
    } catch (err) {
      next(err);
    }
  };
  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. validate req.body
      const data = await validateBody(ResetPasswordDTO, req.body);
      // 2. call service
      await this.authService.resetPassword(data);
      // 3. respond
      res.status(200).json({ message: "Password reset successful. Please login with your new password." });
    } catch (err) {
      next(err);
    }
}
}
export const authController = new AuthController(authService);
