import { Injectable } from "@nestjs/common";

import { RoleService } from "./modules/role/role.service";
import { CompanyService } from "./modules/company/company.service";
import { JobStatusService } from "./modules/job-status/job-status.service";
import { ProblemTypeService } from "./modules/problem-type/problem-type.service";

@Injectable()
export class AppService {
  constructor(
    private roleService: RoleService,
    private companyService: CompanyService,
    private problemTypeService: ProblemTypeService,
    private jobStatusService: JobStatusService
  ) { }

  async onApplicationBootstrap() {
    await this.runSeeders()
  }

  async runSeeders() {
    try {
      await this.roleService.seed()
      await this.companyService.seed()
      await this.problemTypeService.seed()
      await this.jobStatusService.seed()
    } catch (error) { }
  }
}