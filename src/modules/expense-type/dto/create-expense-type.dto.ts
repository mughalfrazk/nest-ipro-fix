import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateExpenseType {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_purchase: boolean;
}