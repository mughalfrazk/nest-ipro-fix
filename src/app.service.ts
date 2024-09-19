import { Injectable } from "@nestjs/common";
import { RoleService } from "./modules/role/role.service";
import { CompanyService } from "./modules/company/company.service";

@Injectable()
export class AppService {
  constructor(
    private roleService: RoleService,
    private companyService: CompanyService
  ) { }

  async onApplicationBootstrap() {
    await this.runSeeders()
  }

  async runSeeders() {
    try {
      await this.roleService.seed()
      await this.companyService.seed()
    } catch (error) { }
  }
}