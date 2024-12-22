import { CreateInvoiceItem } from "@/modules/invoice-item/dto/create-invoice-item.dto";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  technician_id: string;

  @IsString()
  @IsNotEmpty()
  job_id: string;

  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsNumber()
  @IsNotEmpty()
  issue_total: number;

  @IsNumber()
  @IsNotEmpty()
  purchase_total: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateInvoiceItem)
  invoice_items: CreateInvoiceItem[]
}