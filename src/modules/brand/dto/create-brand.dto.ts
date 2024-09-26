import { IsOptional, IsString } from "class-validator";

export class CreateBrand {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}