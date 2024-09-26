import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JobController } from "./job.controller";
import { JobService } from "./job.service";
import { Job } from "./job.entity";
import { IssueModule } from "../issue/issue.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    IssueModule
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService]
})
export class JobModule { }