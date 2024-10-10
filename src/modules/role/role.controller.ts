import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";

@ApiTags("Roles")
@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getAll() {
    return this.roleService.findAll()
  }
}