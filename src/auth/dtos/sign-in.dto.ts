import { z } from "zod";
import { IsString } from "class-validator";
import { ApiBody } from "@nestjs/swagger";

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