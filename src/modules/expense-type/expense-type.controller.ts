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
  constructor(private expenseTypeService: ExpenseTypeService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.expenseTypeService.findAll(company.id)
  }

  @Post()
  async create(@Body() body: CreateExpenseType, @AuthUser() { company }: Users) {
    const brandEntity = await this.expenseTypeService.findByName(body.name, company.id);
    if (brandEntity) throw new BadRequestException("Expense type already exists.")

    return this.expenseTypeService.create(body, company.id)
  }

  @Patch(':id')
  async update(@Param("id") id: number, @Body() body: UpdateExpenseType) {
    const brandEntity = await this.expenseTypeService.findById(id);
    if (!brandEntity) throw new BadRequestException("Expense type not found.")

    if (body.name === "") throw new BadRequestException("Name is required.")

    return this.expenseTypeService.update(id, body)
  }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    await this.expenseTypeService.deleteRow(id)
  }
}