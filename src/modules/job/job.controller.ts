import { BadRequestException, Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";

import { JobService } from "./job.service";
import { Users } from "../users/users.entity";
import { CreateJobDto } from "./dto/create-job.dto";
import { Roles } from "@/auth/decorators/roles.decorator";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { JobStatusService } from "../job-status/job-status.service";
import { CustomerService } from "../customer/customer.service";
import { UpdateJobDto } from "./dto/update-job.dto";
import { IssueService } from "../issue/issue.service";
import { RoleTypes } from "@/types/roles.types";

@ApiTags("Job")
@Controller("job")
export class JobController {
  constructor(
    private jobService: JobService,
    private customerService: CustomerService,
    private jobStatusService: JobStatusService,
    private issueService: IssueService
  ) { }

  @Get()
  @Roles([RoleTypes.SUPER_ADMIN, RoleTypes.ADMIN, RoleTypes.RECEPTIONIST, RoleTypes.TECHNICIAN, RoleTypes.STAFF])
  async getAll(@AuthUser() user: Users) {
    if (user.role.name !== RoleTypes.SUPER_ADMIN && user.role.name !== RoleTypes.ADMIN) {
      return this.jobService.getAllCompanyJobs(user.company.id, user.id)
    }

    return this.jobService.getAllCompanyJobs(user.company.id)
  }

  @Get(":id")
  @ApiParam({ name: "id", required: true })
  @Roles([RoleTypes.SUPER_ADMIN, RoleTypes.ADMIN, RoleTypes.RECEPTIONIST, RoleTypes.TECHNICIAN, RoleTypes.STAFF])
  async getJobById(@Param("id") id: string, @AuthUser() { company }: Users) {
    const job = await this.jobService.findById(id, company.id)
    if (!job) throw new BadRequestException("Job not found.")

    return job
  }

  @Post()
  @Roles([RoleTypes.SUPER_ADMIN, RoleTypes.ADMIN, RoleTypes.RECEPTIONIST])
  async createNewJob(@Body() body: CreateJobDto, @AuthUser() user: Users) {
    const job_status = await this.jobStatusService.findByName("Device Received")
    if (!job_status) throw new BadRequestException("Job status error")

    if (!body.customer_id && body.customer_id !== "new") {
      const customerEntity = await this.customerService.findByNameOrPhone(body.customer.name, body.customer.phone)
      if (customerEntity) throw new BadRequestException("Customer already exist.")
    }

    body = {
      ...body,
      issues: body.issues.map(({ brand_id, charges, model_id, problem_id, quantity, total, job_id }) => ({
        brand_id,
        charges,
        model_id,
        problem_id,
        quantity,
        total,
        job_id
      }))
    }

    if (!body.technician_id) body.technician_id = user.id
    return await this.jobService.create(body, job_status.id, user.company.id)
  }

  @Patch(":id")
  @Roles([RoleTypes.SUPER_ADMIN, RoleTypes.ADMIN, RoleTypes.RECEPTIONIST, RoleTypes.TECHNICIAN])
  async updateJob(@Param("id") id: string, @Body() body: UpdateJobDto, @AuthUser() { company }: Users) {
    const selectedJob = await this.jobService.findById(id, company.id)
    if (!selectedJob) throw new BadRequestException("Job does not exist.")

    // const jobStatusEntity = await this.jobStatusService.findByName("Job Done")
    // if (jobStatusEntity.id === selectedJob.job_status.id) throw new BadRequestException("Job cannot be updated after its done.")

    const newIssues = body.issues.filter(item => item.id === "new")
    const oldIssues = body.issues.filter(item => item.id !== "new")

    // TODO: Can be problematic, because old issues, new issues and job are updating seperatelty and any one might fail while other not.
    newIssues.map(async item => await this.issueService.create(item, id))
    oldIssues.map(async item => await this.issueService.update(item.id, item, id))

    return await this.jobService.update(id, body)
  }
}