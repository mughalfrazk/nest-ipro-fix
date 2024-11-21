import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BrandService } from "./brand.service";
import { CreateBrand } from "./dto/create-brand.dto";
import { UpdateBrand } from "./dto/update-brand.dto";

@ApiTags("Brand")
@Controller("brand")
export class BrandController {
  constructor(private brandService: BrandService) { }

  @Get()
  async getAll() {
    return this.brandService.findAll()
  }

  @Post()
  async create(@Body() body: CreateBrand) {
    const brandEntity = await this.brandService.findByName(body.name);
    if (brandEntity) throw new BadRequestException("Brand already exists.")

    return this.brandService.create(body)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateBrand) {
    const brandEntity = await this.brandService.findById(id);
    if (!brandEntity) throw new BadRequestException("Brand not found.")

    return this.brandService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    await this.brandService.deleteRow(id)
  }
}