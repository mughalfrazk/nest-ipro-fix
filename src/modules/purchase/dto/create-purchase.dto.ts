import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreatePurchasesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreatePurchaseDto)
  purchases: CreatePurchaseDto[]

  @IsString()
  job_id: string;
}

class CreatePurchaseDto {
  @IsNumber()
  brand_id: number;

  @IsString()
  model: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  charges: number;

  @IsNumber()
  total: number;

  @IsString()
  parts: string;
}