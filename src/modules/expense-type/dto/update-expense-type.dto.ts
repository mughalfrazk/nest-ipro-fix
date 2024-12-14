import { IsOptional, IsString } from "class-validator";

export class UpdateExpenseType {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}