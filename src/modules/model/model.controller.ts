import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ModelService } from "./model.service";
import { CreateModel } from "./dto/create-model.dto";
import { UpdateModel } from "./dto/update-model.dto";

@ApiTags("Model")
@Controller("model")
export class ModelController {
  constructor(private modelService: ModelService) { }

  @Get()
  async getAll() {
    return this.modelService.findAll()
  }

  @Post()
  async create(@Body() body: CreateModel) {
    const brandEntity = this.modelService.findByName(body.name);
    if (brandEntity) throw new BadRequestException("Model already exists.")

    return this.modelService.create(body)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateModel) {
    const modelEntity = await this.modelService.findById(id);
    if (!modelEntity) throw new BadRequestException("Model not found.")

    return this.modelService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    await this.modelService.deleteRow(id)
  }
}