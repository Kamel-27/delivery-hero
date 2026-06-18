import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";
export class UserController {
  constructor(private readonly userService: UserService) {}
  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getByUserId(req.user.id);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
}
