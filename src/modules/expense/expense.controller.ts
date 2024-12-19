import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { CreateExpense } from "./dto/create-expense.dto";
import { Users } from "@/modules/users/users.entity";
import { ExpenseService } from "./expense.service";
import { ExpenseTypeService } from "../expense-type/expense-type.service";

@ApiTags("Expense")
@Controller("expense")
export class ExpenseController {
  constructor(private expenseService: ExpenseService, private expenseTypeService: ExpenseTypeService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.expenseService.findAll(company.id)
  }

  @Post()
  async create(@Body() body: CreateExpense, @AuthUser() user: Users) {
    const expenstTypeEntity = await this.expenseTypeService.findById(body.expense_type_id)
    if (!expenstTypeEntity) throw new BadRequestException("Valid expense type is required.")

    return this.expenseService.create(body, user)
  }

  // @Patch(':id')
  // async update(@Param("id") id: string, @Body() body: UpdateExpenseType) {
  //   const brandEntity = await this.expenseService.findById(id);
  //   if (!brandEntity) throw new BadRequestException("Brand not found.")

  //   if (body.name === "") throw new BadRequestException("Name is required.")

  //   return this.expenseService.update(id, body)
  // }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    await this.expenseService.deleteRow(id)
  }
}