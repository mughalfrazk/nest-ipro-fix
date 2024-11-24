import { IsOptional, IsString } from "class-validator";

export class UpdatePart {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}