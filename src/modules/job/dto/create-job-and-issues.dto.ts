import { CreateIssueDto } from "@/modules/issue/dto/create-issue.dto";
import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";

class TechnicianId {
  @IsString()
  id: string
}

class CustomerId {
  @IsString()
  id: string;
}

class CompanyId {
  @IsString()
  id: string;
}

export class CreateJobAndIssuesDto {
  @Type(() => CustomerId)
  customer: CustomerId;

  @Type(() => TechnicianId)
  technician: TechnicianId;

  @Type(() => CompanyId)
  company: CompanyId;

  @IsArray()
  issues: CreateIssueDto[]
}