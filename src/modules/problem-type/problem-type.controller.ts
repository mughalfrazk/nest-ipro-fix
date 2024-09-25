import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProblemTypeService } from "./problem-type.service";

@ApiTags("Problem Type")
@Controller("problem-type")
export class ProblemTypeController {
  constructor(private problemTypeService: ProblemTypeService) { }

  @Get()
  async getAll() {
    return this.problemTypeService.findAll()
  }
}