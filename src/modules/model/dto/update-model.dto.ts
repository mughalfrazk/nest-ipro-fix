import { IsOptional, IsString } from "class-validator";

export class UpdateModel {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}