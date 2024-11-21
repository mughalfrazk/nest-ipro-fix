import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProblemController } from "./problem.controller";
import { ProblemService } from "./problem.service";
import { Problem } from "./problem.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem])
  ],
  controllers: [ProblemController],
  providers: [ProblemService],
  exports: [ProblemService]
})
export class ProblemModule { }