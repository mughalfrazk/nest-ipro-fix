import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { CreateInvoiceItem } from "./dto/create-invoice-item.dto";
import { Users } from "@/modules/users/users.entity";
import { InvoiceItemService } from "./invoice-item.service";

@ApiTags("Invoice")
@Controller("invoice")
export class InvoiceItemController {
  constructor(private invoiceItemService: InvoiceItemService) { }

  @Get()
  async getAll(@AuthUser() { company }: Users) {
    return this.invoiceItemService.findAll(company.id)
  }

  @Post()
  async create(@Body() body: CreateInvoiceItem, @AuthUser() user: Users) {
    return this.invoiceItemService.create(body, user)
  }

  // @Patch(':id')
  // async update(@Param("id") id: string, @Body() body: UpdateExpenseType) {
  //   const brandEntity = await this.invoiceService.findById(id);
  //   if (!brandEntity) throw new BadRequestException("Brand not found.")

  //   if (body.name === "") throw new BadRequestException("Name is required.")

  //   return this.invoiceService.update(id, body)
  // }

  @Delete(':id')
  async delete(@Param("id") id: string) {
    const entity = await this.invoiceItemService.findById(id)
    if (!entity) throw new BadRequestException("Invoice item not found")

    await this.invoiceItemService.deleteRow(id)
  }
}