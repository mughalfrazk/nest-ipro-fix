import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ExpenseTypeService } from "./expense-type.service";
import { CreateExpenseType } from "./dto/create-expense-type.dto";
import { UpdateExpenseType } from "./dto/update-expense-type.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";

@ApiTags("Expense Type")
@Controller("expense-type")
export class ExpenseTypeController {
  constructor(private brandService: ExpenseTypeService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.brandService.findAll(company.id)
  }

  @Post()
  async create(@Body() body: CreateExpenseType, @AuthUser() { company }: Users) {
    const brandEntity = await this.brandService.findByName(body.name, company.id);
    if (brandEntity) throw new BadRequestException("Brand already exists.")

    return this.brandService.create(body, company.id)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateExpenseType) {
    const brandEntity = await this.brandService.findById(id);
    if (!brandEntity) throw new BadRequestException("Brand not found.")

    if (body.name === "") throw new BadRequestException("Name is required.")

    return this.brandService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    await this.brandService.deleteRow(id)
  }
}