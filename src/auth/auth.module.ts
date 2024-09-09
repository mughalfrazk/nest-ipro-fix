import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { jwtConstants } from './constants';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' }
  })],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
