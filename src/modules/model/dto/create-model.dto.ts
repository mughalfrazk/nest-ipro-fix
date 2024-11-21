import { IsOptional, IsString } from "class-validator";

export class CreateModel {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}