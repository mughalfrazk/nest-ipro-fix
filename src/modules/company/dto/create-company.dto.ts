import { IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  logo: string;
}