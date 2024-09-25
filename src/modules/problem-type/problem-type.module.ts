import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProblemType } from "./problem-type.entity";
import { ProblemTypeService } from "./problem-type.service";
import { ProblemTypeController } from "./problem-type.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ProblemType])],
  controllers: [ProblemTypeController],
  providers: [ProblemTypeService],
  exports: [ProblemTypeService]
})
export class ProblemTypeModule { }