import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JobStatus } from "./job-status.entity";
import { JobStatusController } from "./job-status.controller";
import { JobStatusService } from "./job-status.service";

@Module({
  imports: [TypeOrmModule.forFeature([JobStatus])],
  controllers: [JobStatusController],
  providers: [JobStatusService],
  exports: [JobStatusService]
})
export class JobStatusModule { }