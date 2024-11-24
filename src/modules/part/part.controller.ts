import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PartService } from "./part.service";
import { CreatePart } from "./dto/create-part.dto";
import { UpdatePart } from "./dto/update-part.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";

@ApiTags("Part")
@Controller("part")
export class PartController {
  constructor(private partService: PartService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.partService.findAll(company.id)
  }

  @Post()
  async create(@Body() body: CreatePart, @AuthUser() { company }: Users) {
    const partEntity = await this.partService.findByName(body.name, company.id);
    if (partEntity) throw new BadRequestException("Part already exists.")

    return this.partService.create(body, company.id)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdatePart, @AuthUser() { company }: Users) {
    const partEntity = await this.partService.findById(id);
    if (!partEntity) throw new BadRequestException("Part not found.")

    const repeatedEntity = await this.partService.findByName(body.name, company.id);
    if (repeatedEntity) throw new BadRequestException("Part already exists.")

    return this.partService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    await this.partService.deleteRow(id)
  }
}