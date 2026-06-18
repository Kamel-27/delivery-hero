import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { createHash } from "crypto";
import { env } from "../../common/config/env";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export function createAccessToken(payload: JwtPayload): string {
  const options: SignOptions = { expiresIn: env.jwt.accessExpiresIn as any };
  return jwt.sign(payload, env.jwt.accessSecret, options);
}

export function createRefreshToken(payload: JwtPayload): string {
  const options: SignOptions = { expiresIn: env.jwt.refreshExpiresIn as any };
  return jwt.sign(payload, env.jwt.refreshSecret, options);
}

export function comparePasswords(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function generateOTP(): string {
  return Math.floor(Math.random() * 900000 + 100000).toString();
}

export async function hashOTP(otp: string): Promise<string> {
  return createHash("sha256").update(otp).digest("hex");
}
export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwt.accessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwt.refreshSecret) as JwtPayload;
}
