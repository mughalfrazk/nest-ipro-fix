import { Request } from "express"
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "src/decorators/allow-anon.decorator";
import { jwtConstants } from "../constants";
import { UsersService } from "src/modules/users/users.service";
import { JwtPayload } from "../dtos/jwt.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException("401: Unauthorized Exception");
    }


    try {
      const { sub }: JwtPayload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
      const userProfile = await this.usersService.findById(sub)

      if (!userProfile) throw new UnauthorizedException("401: Unauthorized Exception");

      request.user = userProfile;
    } catch (error) {
      throw new UnauthorizedException("401: Unauthorized Exception");
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined
  }
}