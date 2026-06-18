import { SystemRole } from "../../user/enum";
import {
  findUserByEmail,
  findUserExistsByEmail,
  createUser,
} from "../../user/repository/users.repo";
import {
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from "../dto/auth.dto";
import {
  UserAlreadyExistsError,
  CannotSignupAsSystemAdmin,
  InvalidCredentialsError,
  InvalidPasswordResetOtpError,
  InvalidPasswordResetRequestError,
} from "../errors";
import {
  createPasswordReset,
  findLatestPasswordResetByUserId,
  updatePasswordResetConsumedAt,
  updateUserPassword,
} from "../repository/password-reset.repo";
import {
  hashPassword,
  createAccessToken,
  createRefreshToken,
  comparePasswords,
  generateOTP,
  hashOTP,
} from "../utils";

export class AuthService {
  register = async (data: RegisterDTO) => {
    if (data.role == SystemRole.SYSTEM_ADMIN) {
      throw CannotSignupAsSystemAdmin;
    }
    // 1. check if user exists by email
    const existing = await findUserExistsByEmail(data.email);

    // 2. if exists we throw an error
    if (existing) {
      throw UserAlreadyExistsError;
    }
    // 3. hashPassword
    const hashedPassword = await hashPassword(data.password);

    // 4. create user
    const now = new Date();
    const user = await createUser({
      email: data.email,
      phone: data.phone,
      name: data.name,
      passwordHash: hashedPassword,
      systemRole: data.role,
      createdAt: now,
      updatedAt: now,
    });

    // 5. create access token , refresh token
    const payload = { userId: user.id, role: data.role, email: user.email };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    // 6. return tokens and user data
    return {
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        systemRole: user.systemRole,
        createdAt: user.createdAt,
      },
    };
  };
  login = async (data: LoginDTO) => {
    // 1. find user by email
    const user = await findUserByEmail(data.email);
    // 2. if user not found throw error
    if (!user) {
      throw InvalidCredentialsError;
    }
    //compare password with hash
    const isMatch = await comparePasswords(data.password, user.passwordHash);
    //if password wrong throw error
    if (!isMatch) {
      throw InvalidCredentialsError;
    }
    // if password matches, create access token and refresh token
    const payload = {
      userId: user.id,
      role: user.systemRole,
      email: user.email,
    };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    return {
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        systemRole: user.systemRole,
        createdAt: user.createdAt,
      },
    };
  };
  forgotPassword = async (data: ForgotPasswordDTO) => {
    // 1. find user by email
    const user = await findUserByEmail(data.email);
    // 2. if user not found throw error
    if (!user) {
      return;
    }
    // 3. generate OTP
    const otp = generateOTP();
    // 4. hash OTP
    const otpHash = await hashOTP(otp);
    await createPasswordReset({
      userId: user.id,
      otpHash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      createdAt: new Date(),
    });
    // 5. send OTP to user email (this is a placeholder, implement actual email sending)
    console.log(`Sending OTP ${otp} to email ${user.email}`);
    return {
      message: "OTP sent to your email",
    };
  };

  resetPassword = async (data: ResetPasswordDTO) => {
    // 1. find user by email
    const user = await findUserByEmail(data.email);
    // 2. if user not found throw error
    if (!user) {
      throw InvalidPasswordResetRequestError;
    }
    // 3. find latest password reset request for the user
    const passwordReset = await findLatestPasswordResetByUserId(user.id);
    if (!passwordReset || passwordReset.isExpired()) {
      throw InvalidPasswordResetRequestError;
    }
    // 4. compare OTP with hash
    const otpHash = await hashOTP(data.otp);
    const isMatch = otpHash === passwordReset.otpHash;
    if (!isMatch) {
      throw InvalidPasswordResetOtpError;
    }
    // 5. hash new password
    const hashedPassword = await hashPassword(data.password);
    // 6. update user's password
    await updateUserPassword(user.id, hashedPassword);
    // 7. mark the password reset request as consumed
    await updatePasswordResetConsumedAt(passwordReset.id);
  };
}

export const authService = new AuthService();
