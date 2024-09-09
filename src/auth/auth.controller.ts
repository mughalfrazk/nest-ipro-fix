import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AllowAnon } from 'src/decorators/allow-anon.decorator';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @AllowAnon()
  @Post("login")
  signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto)
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  // @Post("signup")
  // async createUser(@Body() body: SignUpDto) {
  // }


  @Get("profile")
  getProfile(@Request() req) {
    return req.user
  }
}
