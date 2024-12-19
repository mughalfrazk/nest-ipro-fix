import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";

import { CreateCustomerDto } from "@/modules/customer/dto/create-customer.dto";
import { CreateIssueDto } from "@/modules/issue/dto/create-issue.dto";
import { UpdateIssueDto } from "@/modules/issue/dto/update-issue.dto";

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  technician_id: string;

  @IsString()
  problem_type_id: string

  @IsNumber()
  job_status_id: number

  @IsString()
  @ValidateIf(j => !j.customer || j.customer_id)
  customer_id: string;

  @ValidateNested({ each: true })
  @ValidateIf(j => !j.customer_id || j.customer)
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => UpdateIssueDto)
  issues: UpdateIssueDto[]
}