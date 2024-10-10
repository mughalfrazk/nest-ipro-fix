import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Roles } from "@/auth/decorators/roles.decorator";

@ApiTags("Users")
@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  @Roles(["super_admin", "admin", "receptionist"])
  async getByRole(@Query("role_id") role_id: string, @Query("speciality_id") speciality_id: string, @AuthUser() { company }) {
    return this.usersService.findByRoleAndSpeciality(company.id, role_id, speciality_id)
  }
}
