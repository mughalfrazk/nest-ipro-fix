import { IsOptional, IsString } from "class-validator";

export class CreateExpenseType {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}