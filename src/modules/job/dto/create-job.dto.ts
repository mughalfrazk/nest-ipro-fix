import { CreateIssueDto } from "@/modules/issue/dto/create-issue.dto";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";

export class CreateJobDto {
  @IsString()
  customerId: string;

  @IsString()
  technicianId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateIssueDto)
  issues: CreateIssueDto[]
}