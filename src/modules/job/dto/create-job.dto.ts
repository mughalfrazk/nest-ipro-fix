import { IsOptional, IsString } from "class-validator";

export class CreateJobDto {
  @IsString()
  customerId: string;

  @IsString()
  technicianId: string;
}