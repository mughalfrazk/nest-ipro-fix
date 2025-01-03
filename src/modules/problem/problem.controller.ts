import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProblemService } from "./problem.service";
import { CreateProblem } from "./dto/create-problem.dto";
import { UpdateProblem } from "./dto/update-problem.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";

@ApiTags("Problem")
@Controller("problem")
export class ProblemController {
  constructor(private problemService: ProblemService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.problemService.findAll(company.id)
  }

  @Post()
  async create(@Body() body: CreateProblem, @AuthUser() { company }: Users) {
    const problemEntity = await this.problemService.findByName(body.name, company.id);
    if (problemEntity) throw new BadRequestException("Problem already exists.")

    return this.problemService.create(body, company.id)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateProblem, @AuthUser() { company }: Users) {
    const entity = await this.problemService.findById(id);
    if (!entity) throw new BadRequestException("Issue name not found.")

    if (body.name === "") throw new BadRequestException("Name is required.")
    if (body.name.toLowerCase() === entity.name.toLowerCase()) throw new BadRequestException("Problem already exists.")

    return this.problemService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: number) {
    const entity = await this.problemService.findById(id)
    if (!entity) throw new BadRequestException("Issue not found")

    if (!!entity.issues.length) throw new BadRequestException("Issue cannot be deleted, due to dependency with jobs issue.")

    await this.problemService.deleteRow(id)
  }
}