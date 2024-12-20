import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { Users } from "../users/users.entity";
import { SupplierService } from "./supplier.service";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";

@ApiTags("Supplier")
@Controller("supplier")
export class SupplierController {
  constructor(
    private supplierService: SupplierService
  ) { }

  @Get()
  @Roles(['super_admin', 'admin'])
  async getAll(@AuthUser() user: Users) {
    const { company } = user
    return this.supplierService.getAllByCompany(company.id)
  }

  @Get("/purchases")
  @Roles(['super_admin', 'admin'])
  async getAllPurchasesBySupplier(@AuthUser() { company }: Users) {
    return this.supplierService.findAllPurchasesBySupplier(company.id)
  }

  @Post()
  @Roles(['super_admin', 'admin'])
  async create(@Body() { name, description }: CreateSupplierDto, @AuthUser() user: Users) {
    const { company } = user

    const isDuplicated = await this.supplierService.findInCompanyByName(name, company.id)
    if (isDuplicated) throw new BadRequestException("Supplier already exists.")

    return this.supplierService.create({ name, description, company })
  }

  @Patch(":id")
  @Roles(["super_admin", "admin"])
  async update(@Param("id") id: string, @Body() body: UpdateSupplierDto, @AuthUser() { company }: Users) {
    const entity = await this.supplierService.findById(id);
    if (!entity) throw new BadRequestException("Supplier not found.")

    if (body.name === "") throw new BadRequestException("Name is required.")
    if (body.name.toLowerCase() === entity.name.toLowerCase()) throw new BadRequestException("Supplier already exists.")

    return this.supplierService.update(id, body)
  }

  @Delete(":id")
  @Roles(["super_admin", "admin"])
  async delete(@Param("id") id: string) {
    const entity = await this.supplierService.findById(id)
    if (!entity) throw new BadRequestException("Supplier not found")

    if (!!entity.purchases.length) throw new BadRequestException("Supplier cannot be deleted, due to dependency with purchases.")

    await this.supplierService.deleteRow(id)
  }
}