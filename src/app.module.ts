import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { JobModule } from './modules/job/job.module';
import { Brand } from './modules/brand/brand.entity';
import { Issue } from './modules/issue/issue.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Users } from './modules/users/users.entity';
import { RoleModule } from './modules/role/role.module';
import { Role } from './modules/role/role.entity';
import { CompanyModule } from './modules/company/company.module';
import { Company } from './modules/company/company.entity';
import { SupplierModule } from './modules/supplier/supplier.module';
import { Supplier } from './modules/supplier/supplier.entity';
import { ProblemTypeModule } from './modules/problem-type/problem-type.module';
import { ProblemType } from './modules/problem-type/problem-type.entity';
import { CustomerModule } from './modules/customer/customer.module';
import { Customer } from './modules/customer/customer.entity';
import { BrandModule } from './modules/brand/brand.module';
import { IssueModule } from './modules/issue/issue.module';
import { JobStatus } from './modules/job-status/job-status.entity';
import { JobStatusModule } from './modules/job-status/job-status.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { ProblemModule } from './modules/problem/problem.module';
import { Purchase } from './modules/purchase/purchase.entity';
import { ModelModule } from './modules/model/model.module';
import { Problem } from './modules/problem/problem.entity';
import { Model } from './modules/model/model.entity';
import { Job } from './modules/job/job.entity';
import { Part } from './modules/part/part.entity';
import { PartModule } from './modules/part/part.module';
import { ExpenseType } from './modules/expense-type/expense-type.entity';
import { ExpenseTypeModule } from './modules/expense-type/expense-type.module';
import { Expense } from './modules/expense/expense.entity';
import { ExpenseModule } from './modules/expense/expense.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.local", ".env"],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        url: config.get("DATABASE_URL"),
        synchronize: true,
        // logging: true,
        entities: [
          Role,
          Company,
          Users,
          Supplier,
          ProblemType,
          Customer,
          JobStatus,
          Job,
          Brand,
          Model,
          Problem,
          Part,
          Issue,
          Purchase,
          ExpenseType,
          Expense
        ],
        namingStrategy: new SnakeNamingStrategy()
      })
    }),
    AuthModule,
    RoleModule,
    CompanyModule,
    UsersModule,
    SupplierModule,
    ProblemTypeModule,
    CustomerModule,
    JobStatusModule,
    JobModule,
    BrandModule,
    ModelModule,
    ProblemModule,
    PartModule,
    IssueModule,
    PurchaseModule,
    ExpenseTypeModule,
    ExpenseModule
  ],
  providers: [AppService]
})
export class AppModule { }
