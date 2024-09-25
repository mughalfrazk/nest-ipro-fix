import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Users } from "../users/users.entity";
import { SupplierService } from "./supplier.service";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { Roles } from "src/auth/decorators/roles.decorator";

@ApiTags("Supplier")
@Controller("supplier")
export class SupplierController {
  constructor(
    private supplierService: SupplierService
  ) { }

  @Get()
  @Roles(['admin'])
  async getAll(@AuthUser() user: Users) {
    const { company } = user
    return this.supplierService.getAllByCompany(company.id)
  }

  @Post()
  @Roles(['admin'])
  async create(@Body() body: CreateSupplierDto, @AuthUser() user: Users) {
    const { company } = user

    const isDuplicated = await this.supplierService.findInCompanyByName(body.name, company.id)
    if (isDuplicated) {
      throw new BadRequestException("Supplier already exists.")
    }

    return this.supplierService.create({ ...body, company })
  }
}