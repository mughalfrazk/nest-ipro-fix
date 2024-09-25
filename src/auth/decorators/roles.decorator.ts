import { applyDecorators, SetMetadata } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export const Roles = (roles: string[]) => {
  return applyDecorators(
    SetMetadata("roles", roles),
    ApiOperation({ description: `Authorized roles: (${roles.join(", ")})` })
  )
}

// export const Roles = Reflector.createDecorator<string[]>();