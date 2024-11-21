import { ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Get, Post, Request } from '@nestjs/common';

import { AllowAnon } from 'src/decorators/allow-anon.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Roles } from './decorators/roles.decorator';
import { AuthUser } from '@/decorators/auth-user.decorator';
import { Users } from '@/modules/users/users.entity';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  @AllowAnon()
  @Post("login")
  async signIn(@Body() body: SignInDto) {
    const { email, password } = body;
    const userEntity = await this.usersService.findByEmail(body.email)
    if (!userEntity) throw new BadRequestException("User not found.")

    return this.authService.signIn(email, password)
  }

  @AllowAnon()
  @Post("create-user")
  // @Roles(["super_admin", "admin"])
  async createUser(@Body() body: SignUpDto, @AuthUser() user: Users) {
    const userEntity = await this.usersService.findByEmail(body.email)
    if (!!userEntity) throw new BadRequestException("Email already in use.")

    await this.authService.signUp(body, "cc43d7d8-5850-46e1-9817-224a65663fc8")
    return "User created successfully"
  }

  @Get("profile")
  @Roles(['super_admin'])
  getProfile(@Request() { user }) {
    return user
  }
}
