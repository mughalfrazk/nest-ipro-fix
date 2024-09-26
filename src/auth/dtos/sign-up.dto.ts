import { IsEmail, IsString, MinLength } from "class-validator";
import { z } from "zod";

export const SignUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
})

export class SignUpDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  role_id: string;
}