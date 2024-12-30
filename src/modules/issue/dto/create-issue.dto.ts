import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateIssueDto {
  @IsOptional()
  id?: string;

  @IsNumber()
  problem_id: number;

  @IsNumber()
  model_id: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  charges: number;

  @IsNumber()
  total: number;

  @IsNumber()
  brand_id: number;

  @IsString()
  @IsOptional()
  job_id: string;
}