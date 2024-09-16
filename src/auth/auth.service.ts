import * as bcrypt from 'bcrypt'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/modules/users/users.service';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signIn(email: string, pass: string): Promise<{ id: string, email: string, access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password)

    if (!isMatch) {
      throw new UnauthorizedException("Unathorized, Invalid credentials");
    }

    const payload = { sub: user.userId, email: user.email };
    return {
      id: user.userId,
      email: user.email,
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  async signUp(body: SignUpDto) {
    const saltOrRounds = await bcrypt.genSalt();
    const password = await bcrypt.hash(body.password, saltOrRounds)

    return this.usersService.create({ ...body, password })
  }
}
