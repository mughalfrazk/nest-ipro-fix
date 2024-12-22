import { IsOptional, IsString } from "class-validator";

export class UpdateInvoice {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}