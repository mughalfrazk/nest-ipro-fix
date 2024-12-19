import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PartService } from "./part.service";
import { CreatePartDto } from "./dto/create-part.dto";
import { UpdatePartDto } from "./dto/update-part.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";
import { Roles } from "@/auth/decorators/roles.decorator";

@ApiTags("Part")
@Controller("part")
export class PartController {
  constructor(private partService: PartService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.partService.findAll(company.id)
  }

  @Post()
  @Roles(["super_admin", "admin"])
  async create(@Body() body: CreatePartDto, @AuthUser() { company }: Users) {
    const partEntity = await this.partService.findByName(body.name, company.id);
    if (partEntity) throw new BadRequestException("Part already exists.")

    return this.partService.create(body, company.id)
  }

  @Patch(':id')
  @Roles(["super_admin", "admin"])
  async update(@Param("id") id: number, @Body() body: UpdatePartDto, @AuthUser() { company }: Users) {
    const partEntity = await this.partService.findById(id);
    if (!partEntity) throw new BadRequestException("Part not found.")

    if (body.name === "") throw new BadRequestException("Name is required.")

    return this.partService.update(id, body)
  }

  @Delete(':id')
  @Roles(["super_admin", "admin"])
  async delete(@Param("id") id: number) {
    const entity = await this.partService.findById(id)
    if (!entity) throw new BadRequestException("Part not found")

    if (!!entity.purchases.length) throw new BadRequestException("Part cannot be deleted, due to dependency with purchases.")

    await this.partService.deleteRow(id)
  }
}