import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";
import { Roles } from "@/auth/decorators/roles.decorator";

@ApiTags("Job")
@Controller("job")
export class JobController {
  constructor(private jobService: JobService) { }

  @Get()
  @Roles(["super_admin", "technician"])
  async getAll(@AuthUser() { company: { id } }: Users) {
    return this.jobService.getAllCompanyJobs(id)
  }

  @Post()
  @Roles(["super_admin", "receptionist"])
  async createNewJob(@Body() body: CreateJobDto, @AuthUser() user: Users) {
    return await this.jobService.create(body, user.company.id)
  }
}