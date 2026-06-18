import {
  IsEmail,
  MinLength,
  IsString,
  IsStrongPassword,
  MaxLength,
  IsEnum,
  Length,
} from "class-validator";
import { SystemRole } from "../../user/enum";

export class RegisterDTO {
  @IsEmail()
  email!: string;

  @MinLength(10)
  @MaxLength(11)
  phone!: string;

  @IsString()
  @MinLength(1)
  name!: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        "Password is not strong enough. It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.",
    },
  )
  password!: string;

  @IsEnum(SystemRole)
  role!: SystemRole;
}

export class LoginDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class ForgotPasswordDTO {
  @IsEmail()
  email!: string;
}

export class ResetPasswordDTO {
  @IsEmail()
  email!: string;
  @IsString()
  @Length(6)
  otp!: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        "Password is not strong enough. It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.",
    },
  )
  password!: string;
}
