import { IsString } from "class-validator";

export class UpdateComment {
  @IsString()
  comment: string;
}