import { IsOptional, IsString } from "class-validator";

export class CreatePart {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}