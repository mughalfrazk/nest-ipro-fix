import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Model } from "./model.entity";
import { ModelController } from "./model.controller";
import { ModelService } from "./model.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Model])
  ],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [ModelService]
})
export class ModelModule { }