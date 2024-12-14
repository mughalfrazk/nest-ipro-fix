import { IsOptional, IsString } from "class-validator";

export class CreatePartDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}