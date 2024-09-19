import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator";
import { Users } from "src/modules/users/users.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get(Roles, context.getHandler());
    if (!roles.length) {
      return true
    }
    
    const request = context.switchToHttp().getRequest();
    const user: Users = request.user;
    if (roles.includes(user.role.name)) {
      return true
    }

    throw new ForbiddenException("Authorization failed!")
  }
}