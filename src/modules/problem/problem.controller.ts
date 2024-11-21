import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProblemService } from "./problem.service";
import { CreateProblem } from "./dto/create-problem.dto";

@ApiTags("Problem")
@Controller("problem")
export class ProblemController {
  constructor(private problemService: ProblemService) { }

  @Get()
  async getAll() {
    return this.problemService.findAll()
  }

  @Post()
  async create(@Body() body: CreateProblem) {
    const brandEntity = this.problemService.findByName(body.name);
    if (brandEntity) throw new BadRequestException("Problem already exists.")

    return this.problemService.create(body)
  }
}