import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterRequestDTO {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password!: string;
}

export class LoginRequestDTO {
  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password!: string;
}

export class OtpVerifyRequestDTO {
  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "OTP is required" })
  @Length(6, 6, { message: "OTP must be 6 digits" })
  otp!: string;
}
