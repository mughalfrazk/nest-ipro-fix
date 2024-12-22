import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInvoiceItem {
  @IsString()
  @IsOptional()
  invoice_id: string;

  @IsString()
  item_type: string;

  @IsString()
  @IsOptional()
  brand_name: string;

  @IsNumber()
  @IsOptional()
  brand_id: number;

  @IsString()
  @IsOptional()
  issue_model_name: string;

  @IsNumber()
  @IsOptional()
  issue_model_id: number;

  @IsString()
  @IsOptional()
  purchase_model_name: string;

  @IsNumber()
  @IsOptional()
  purchase_model_id: number;

  @IsString()
  @IsOptional()
  problem_name: string;

  @IsNumber()
  @IsOptional()
  problem_id: number;

  @IsString()
  @IsOptional()
  part_name: string;

  @IsNumber()
  @IsOptional()
  part_id: number;

  @IsNumber()
  @IsOptional()
  charges: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}