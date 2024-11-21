import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  target: number;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  progress: number;

  @IsString()
  @IsOptional()
  address: string;
}