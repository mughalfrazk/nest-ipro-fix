import { IsOptional, IsString } from "class-validator";

export class UpdateProblem {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}