import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";

@ApiTags("Roles")
@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getAll() {
    const roles = await this.roleService.findAll()
    return roles.filter(item => item.name !== "super_admin")
  }
}