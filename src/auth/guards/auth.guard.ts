import { Request } from "express"
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "src/decorators/allow-anon.decorator";
import { jwtConstants } from "../constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }
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
      throw new ForbiddenException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
      request["user"] = payload;
    } catch (error) {
      throw new ForbiddenException();
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined
  }
}