import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateIssueDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  charges: number;

  @IsNumber()
  total: number;

  @IsNumber()
  brand_id: number;

  @IsString()
  problem_type_id: string;

  @IsString()
  @IsOptional()
  job_id: string;
}