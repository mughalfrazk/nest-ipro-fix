import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpenseType } from "./expense-type.entity";
import { ExpenseTypeController } from "./expense-type.controller";
import { ExpenseTypeService } from "./expense-type.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseType])
  ],
  controllers: [ExpenseTypeController],
  providers: [ExpenseTypeService],
  exports: [ExpenseTypeService]
})
export class ExpenseTypeModule { }