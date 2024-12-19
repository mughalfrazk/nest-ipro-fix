import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Users } from "src/modules/users/users.entity";

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Users => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  }
)