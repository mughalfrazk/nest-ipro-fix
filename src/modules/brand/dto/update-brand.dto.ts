import { IsOptional, IsString } from "class-validator";

export class UpdateBrand {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}