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
  model_id: number;
  
  @IsNumber()
  part_id: number;

  @IsString()
  supplier_id: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}