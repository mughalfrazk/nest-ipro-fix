import { IsOptional, IsString } from "class-validator";

export class UpdatePartDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}