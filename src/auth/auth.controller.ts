import { ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Get, Post, Request } from '@nestjs/common';

import { AllowAnon } from 'src/decorators/allow-anon.decorator';
import { Users } from 'src/modules/users/users.entity';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Roles } from './decorators/roles.decorator';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  @AllowAnon()
  @Post("login")
  signIn(@Body() body: SignInDto) {
    const { email, password } = body;
    return this.authService.signIn(email, password)
  }

  @Post("signup")
  async createUser(@Body() body: SignUpDto) {
    const user = await this.usersService.findByEmail(body.email)
    if (!!user) throw new BadRequestException("Email already in use")

    return this.authService.signUp(body)
  }

  @Get("profile")
  @Roles(['admin'])
  getProfile(@Request() { user }: { user: Users }) {
    return user
  }
}
