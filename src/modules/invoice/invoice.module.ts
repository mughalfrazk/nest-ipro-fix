import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "./invoice.entity";
import { InvoiceController } from "./invoice.controller";
import { InvoiceService } from "./invoice.service";
import { InvoiceStatusModule } from "../invoice-status/invoice-status.module";
import { JobStatusModule } from "../job-status/job-status.module";
import { JobModule } from "../job/job.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    InvoiceStatusModule,
    JobStatusModule,
    JobModule
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService]
})
export class InvoiceModule { }