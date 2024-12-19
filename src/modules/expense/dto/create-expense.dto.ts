import { IsNumber, IsString } from "class-validator";

export class CreateExpense {
  @IsString()
  comments: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  expense_type_id: number
}