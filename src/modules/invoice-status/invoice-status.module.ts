import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { InvoiceStatus } from "./invoice-status.entity";
import { InvoiceStatusController } from "./invoice-status.controller";
import { InvoiceStatusService } from "./invoice-status.service";

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceStatus])],
  controllers: [InvoiceStatusController],
  providers: [InvoiceStatusService],
  exports: [InvoiceStatusService]
})
export class InvoiceStatusModule { }