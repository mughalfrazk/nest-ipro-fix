import { IsOptional, IsString } from "class-validator";

export class UpdateSupplierDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}