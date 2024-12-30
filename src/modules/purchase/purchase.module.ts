import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purchase } from "./purchase.entity";
import { PurchaseService } from "./purchase.service";
import { PurchaseController } from "./purchase.controller";
import { ExpenseTypeModule } from "../expense-type/expense-type.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    ExpenseTypeModule,
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
  exports: [PurchaseService]
})
export class PurchaseModule { }