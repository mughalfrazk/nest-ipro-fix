import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ModelService } from "./model.service";
import { CreateModel } from "./dto/create-model.dto";

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
}