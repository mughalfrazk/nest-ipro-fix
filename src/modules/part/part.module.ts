import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Part } from "./part.entity";
import { PartController } from "./part.controller";
import { PartService } from "./part.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Part])
  ],
  controllers: [PartController],
  providers: [PartService],
  exports: [PartService]
})
export class PartModule { }