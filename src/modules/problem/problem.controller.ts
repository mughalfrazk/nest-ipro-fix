import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProblemService } from "./problem.service";
import { CreateProblem } from "./dto/create-problem.dto";
import { UpdateProblem } from "./dto/update-problem.dto";

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
    const problemEntity = await this.problemService.findByName(body.name);
    if (problemEntity) throw new BadRequestException("Problem already exists.")

    return this.problemService.create(body)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateProblem) {
    const problemEntity = await this.problemService.findById(id);
    if (!problemEntity) throw new BadRequestException("Issue name not found.")

    return this.problemService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    await this.problemService.deleteRow(id)
  }
}