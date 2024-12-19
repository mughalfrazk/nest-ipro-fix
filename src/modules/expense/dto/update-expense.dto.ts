import { IsOptional, IsString } from "class-validator";

export class UpdateExpense {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}