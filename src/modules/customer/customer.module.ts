import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CustomerContoller } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { Customer } from "./customer.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer])
  ],
  controllers: [CustomerContoller],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule { }