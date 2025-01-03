import { BadRequestException, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Roles } from "@/auth/decorators/roles.decorator";
import { RoleService } from "../role/role.service";
import { RoleTypes } from "@/types/roles.types";
import { Users } from "./users.entity";

@ApiTags("Users")
@Controller("user")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private roleService: RoleService
  ) { }

  @Get()
  async getAllCompanyUserByRole(@Query("role_id") role_id: string, @Query("speciality_id") speciality_id: string, @AuthUser() { company }: Users) {
    const users = await this.usersService.findByRoleAndSpecialityWithJobs(company.id, role_id, speciality_id)
    return users.map(user => ({ ...user, jobs: user.jobs.reduce(prev => prev + 1, 0) }))
  }

  @Get("/technician")
  @Roles([RoleTypes.ADMIN, RoleTypes.RECEPTIONIST, RoleTypes.STAFF])
  async getTechnicians(@Query("speciality_id") speciality_id: string, @AuthUser() { company }) {
    const role = await this.roleService.findByName(RoleTypes.TECHNICIAN)
    if (!role) {
      throw new BadRequestException()
    }

    return this.usersService.findByRoleAndSpeciality(company.id, role.id, speciality_id)
  }

  @Get(":id")
  @ApiParam({ name: "id", required: true })
  @Roles([RoleTypes.ADMIN, RoleTypes.RECEPTIONIST, RoleTypes.STAFF])
  async getUserById(@Param("id") id: string) {
    const user = await this.usersService.findById(id)

    if (!user) throw new BadRequestException("User not found.")
    return user
  }

  @Patch(":id")
  @ApiParam({ name: "id", required: true })
  @Roles([RoleTypes.ADMIN, RoleTypes.RECEPTIONIST, RoleTypes.STAFF])
  async updateUserProfile(@Param("id") id: string, body: UpdateUserDto) {
    const user = await this.usersService.findById(id)
    if (!user) throw new BadRequestException("User not found.")
    return this.usersService.update(id, body)
  }
}
