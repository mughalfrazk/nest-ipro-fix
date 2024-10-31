import { BadRequestException, Controller, Get, Param, Query } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
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
    const users = await this.usersService.findByRoleAndSpecialityWithJobs(company.id, role_id, speciality_id)
    return users.map(user => ({ ...user, jobs: user.jobs.reduce(prev => prev + 1, 0) }))
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

  @Get(":id")
  @ApiParam({ name: "id", required: true })
  @Roles(["admin", "receptionist", "staff"])
  async getUserById(@Param("id") id: string) {
    const user = await this.usersService.findById(id)

    if (!user) throw new BadRequestException("User not found.")

    return user
  }
}
