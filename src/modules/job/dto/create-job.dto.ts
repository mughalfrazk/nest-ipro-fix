import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, ValidateIf, ValidateNested } from "class-validator";

import { CreateCustomerDto } from "@/modules/customer/dto/create-customer.dto";
import { CreateIssueDto } from "@/modules/issue/dto/create-issue.dto";

export class CreateJobDto {
  @IsString()
  technician_id: string;

  @IsString()
  problem_type_id: string

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
  @Type(() => CreateIssueDto)
  issues: CreateIssueDto[]
}