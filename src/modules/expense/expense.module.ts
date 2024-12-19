import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "./expense.entity";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";
import { ExpenseTypeModule } from "../expense-type/expense-type.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    ExpenseTypeModule
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService]
})
export class ExpenseModule { }