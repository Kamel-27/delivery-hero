import { findUserById } from "../repository/users.repo";
import { UserNotFoundError } from "../errors";
export class UserService {
  getByUserId = async (userId: number) => {
    const user = await findUserById(userId);
    if (!user) {
      throw UserNotFoundError;
    }
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      systemRole: user.systemRole,
    };
  };
}
export const userService = new UserService();
