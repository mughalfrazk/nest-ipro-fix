import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JobStatusModule } from "../job-status/job-status.module";
import { JobController } from "./job.controller";
import { JobService } from "./job.service";
import { Job } from "./job.entity";
import { CustomerModule } from "../customer/customer.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    JobStatusModule,
    CustomerModule
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService]
})
export class JobModule { }