import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ModelService } from "./model.service";
import { CreateModel } from "./dto/create-model.dto";
import { UpdateModel } from "./dto/update-model.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";

@ApiTags("Model")
@Controller("model")
export class ModelController {
  constructor(private modelService: ModelService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.modelService.findAll(company.id)
  }

  @Post()
  async create(@Body() body: CreateModel, @AuthUser() { company }: Users) {
    const modelEntity = await this.modelService.findByName(body.name, company.id);
    if (modelEntity) throw new BadRequestException("Model already exists.")

    return this.modelService.create(body, company.id)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateModel, @AuthUser() { company }: Users) {
    const entity = await this.modelService.findById(id);
    if (!entity) throw new BadRequestException("Model not found.")

    if (body.name === "") throw new BadRequestException("Name is required.")
    if (body.name.toLowerCase() === entity.name.toLowerCase()) throw new BadRequestException("Model already exists.")

    return this.modelService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: number) {
    const entity = await this.modelService.findById(id)
    if (!entity) throw new BadRequestException("Model not found")

    if (!!entity.purchases.length) throw new BadRequestException("Model cannot be deleted, due to dependency with purchases.")
    if (!!entity.issues.length) throw new BadRequestException("Model cannot be deleted, due to dependency with issues.")

    await this.modelService.deleteRow(id)
  }
}