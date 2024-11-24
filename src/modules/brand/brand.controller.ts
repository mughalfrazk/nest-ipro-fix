import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BrandService } from "./brand.service";
import { CreateBrand } from "./dto/create-brand.dto";
import { UpdateBrand } from "./dto/update-brand.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";

@ApiTags("Brand")
@Controller("brand")
export class BrandController {
  constructor(private brandService: BrandService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.brandService.findAll(company.id)
  }

  @Post()
  async create(@Body() body: CreateBrand, @AuthUser() { company }: Users) {
    const brandEntity = await this.brandService.findByName(body.name, company.id);
    if (brandEntity) throw new BadRequestException("Brand already exists.")

    return this.brandService.create(body, company.id)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateBrand, @AuthUser() { company }: Users) {
    const brandEntity = await this.brandService.findById(id);
    if (!brandEntity) throw new BadRequestException("Brand not found.")

    const repeatedEntity = await this.brandService.findByName(body.name, company.id);
    if (repeatedEntity) throw new BadRequestException("Brand already exists.")

    return this.brandService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    await this.brandService.deleteRow(id)
  }
}