import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./company.entity";
import { CompanyService } from "./company.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Company])
  ],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule { }