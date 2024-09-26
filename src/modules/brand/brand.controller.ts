import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BrandService } from "./brand.service";
import { CreateBrand } from "./dto/create-brand.dto";

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
    const brandEntity = this.brandService.findByName(body.name);
    if (brandEntity) throw new BadRequestException("Brand already exists.")

    return this.brandService.create(body)
  }
}