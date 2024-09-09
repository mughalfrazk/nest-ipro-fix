import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { Users } from './modules/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Password123",
      database: "ipro-fix",
      synchronize: true,
      logging: true,
      entities: [Users],
    }),
    AuthModule,
    UsersModule
  ]
})
export class AppModule { }
