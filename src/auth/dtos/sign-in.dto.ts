import { z } from "zod";
import { IsString } from "class-validator";

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string()
})

export class SignInDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
