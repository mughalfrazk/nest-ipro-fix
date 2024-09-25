import { IsOptional, IsString } from "class-validator";

export class CreateSupplierDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}