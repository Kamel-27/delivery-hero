import bcrypt from 'bcrypt';
import jwt, {SignOptions} from "jsonwebtoken";
import {env} from "../../common/config/env";

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}

export function createAccessToken(payload: JwtPayload) : string {
    const options : SignOptions = {expiresIn: env.jwt.accessExpiresIn as any}
    return jwt.sign(payload, env.jwt.accessSecret, options);
}

export function createRefreshToken(payload: JwtPayload) : string {
    const options : SignOptions = {expiresIn: env.jwt.refreshExpiresIn as any}
    return jwt.sign(payload, env.jwt.refreshSecret, options);
}
