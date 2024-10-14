import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Roles } from "@/auth/decorators/roles.decorator";
import { RoleService } from "../role/role.service";
import { RoleTypes } from "@/types/roles.types";

@ApiTags("Users")
@Controller("user")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private roleService: RoleService
  ) { }

  @Get()
  @Roles(["super_admin", "admin"])
  async getByRole(@Query("role_id") role_id: string, @Query("speciality_id") speciality_id: string, @AuthUser() { company }) {
    return this.usersService.findByRoleAndSpeciality(company.id, role_id, speciality_id)
  }

  @Get("/technician")
  @Roles(["super_admin", "admin", "receptionist"])
  async getTechnicians(@Query("speciality_id") speciality_id: string, @AuthUser() { company }) {
    const role = await this.roleService.findByName(RoleTypes.TECHNICIAN)
    if (!role) {
      throw new BadRequestException()
    }

    return this.usersService.findByRoleAndSpeciality(company.id, role.id, speciality_id)
  }
}
