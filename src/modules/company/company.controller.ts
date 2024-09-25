import { Body, Controller, Get, Post } from "@nestjs/common";
import {  ApiTags } from "@nestjs/swagger";

import { Roles } from "src/auth/decorators/roles.decorator";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CompanyService } from "./company.service";

@ApiTags("Company")
@Controller("company")
export class CompanyController {
  constructor(private companyService: CompanyService) { }

  @Get()
  @Roles(["super_admin"])
  async getAll() {
    return this.companyService.findAll()
  }

  @Post()
  @Roles(["super_admin"])
  async create(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body)
  }
}