import { IsOptional, IsString } from "class-validator";

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;
}