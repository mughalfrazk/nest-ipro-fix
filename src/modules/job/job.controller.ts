import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";

import { JobService } from "./job.service";
import { Users } from "../users/users.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { Roles } from "@/auth/decorators/roles.decorator";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { JobStatusService } from "../job-status/job-status.service";
import { CustomerService } from "../customer/customer.service";

@ApiTags("Job")
@Controller("job")
export class JobController {
  constructor(
    private jobService: JobService,
    private customerService: CustomerService,
    private jobStatusService: JobStatusService
  ) { }

  @Get()
  @Roles(["super_admin", "technician"])
  async getAll(@AuthUser() { company }: Users) {
    return this.jobService.getAllCompanyJobs(company.id)
  }

  @Get(":id")
  @ApiParam({ name: "id", required: true })
  @Roles(["super_admin", "admin", "receptionist"])
  async getJobById(@Param("id") id: string, @AuthUser() { company }: Users) {
    const [job] = await this.jobService.findById(id, company.id)

    if (!job) throw new BadRequestException("Job not found.")
    return job
  }

  @Post()
  @Roles(["super_admin", "admin", "receptionist"])
  async createNewJob(@Body() body: CreateJobDto, @AuthUser() { company }: Users) {
    const job_status = await this.jobStatusService.findByName("Device Received")
    if (!job_status) throw new BadRequestException("Job status error")

    if (!body.customer_id) {
      const customerEntity = await this.customerService.findByNameOrPhone(body.customer.name, body.customer.phone)
      if (customerEntity) throw new BadRequestException("Customer already exist.")
    }

    return await this.jobService.create(body, job_status.id, company.id)
  }
}