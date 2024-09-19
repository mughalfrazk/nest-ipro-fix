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
        logging: true,
        entities: [Role, Company, Users],
      })
    }),
    AuthModule,
    RoleModule,
    CompanyModule,
    UsersModule
  ],
  providers: [AppService]
})
export class AppModule { }
