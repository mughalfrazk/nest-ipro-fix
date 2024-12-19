import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

import { Users } from "src/modules/users/users.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const user: Users = request.user;
    
    if (!user) throw new UnauthorizedException("401: Unauthorized Exception");

    if (roles.includes(user.role.name) || user.role.name === "super_admin") {
      return true
    }

    throw new ForbiddenException("403: Forbidden Exception")
  }
}
