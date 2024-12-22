import { IsOptional, IsString } from "class-validator";

export class UpdateInvoiceItem {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}