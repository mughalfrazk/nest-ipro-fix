import { IsOptional, IsString } from "class-validator";

export class CreateProblem {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}