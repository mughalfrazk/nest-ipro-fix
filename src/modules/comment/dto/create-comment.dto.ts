import { IsString } from "class-validator";

export class CreateComment {
  @IsString()
  comment: string;

  @IsString()
  job_id: string;
}