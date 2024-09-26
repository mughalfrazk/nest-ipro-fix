import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Users } from './modules/users/users.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
import { Role } from './modules/role/role.entity';
import { AppService } from './app.service';
import { CompanyModule } from './modules/company/company.module';
import { Company } from './modules/company/company.entity';
import { SupplierModule } from './modules/supplier/supplier.module';
import { Supplier } from './modules/supplier/supplier.entity';
import { ProblemTypeModule } from './modules/problem-type/problem-type.module';
import { ProblemType } from './modules/problem-type/problem-type.entity';
import { CustomerModule } from './modules/customer/customer.module';
import { Customer } from './modules/customer/customer.entity';
import { Job } from './modules/job/job.entity';
import { JobModule } from './modules/job/job.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Brand } from './modules/brand/brand.entity';
import { Issue } from './modules/issue/issue.entity';
import { BrandModule } from './modules/brand/brand.module';
import { IssueModule } from './modules/issue/issue.module';

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
          Job,
          Brand,
          Issue
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
    JobModule,
    BrandModule,
    IssueModule
  ],
  providers: [AppService]
})
export class AppModule { }
