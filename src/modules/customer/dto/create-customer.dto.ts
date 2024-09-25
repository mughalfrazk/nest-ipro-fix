import { IsString } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  company_name: string;
}