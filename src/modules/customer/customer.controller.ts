import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomerService } from "./customer.service";
import { Roles } from "@/auth/decorators/roles.decorator";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@ApiTags("Customer")
@Controller("customer")
export class CustomerContoller {
  constructor(private customerService: CustomerService) { }

  @Get()
  @Roles(["super_admin", "admin", "receptionist"])
  async getAll() {
    return this.customerService.findAll()
  }

  @Post()
  @Roles(["super_admin", "receptionist"])
  async createCustomer(@Body() body: CreateCustomerDto, @AuthUser() user: Users) {
    return this.customerService.create(body, user.company.id)
  }

  @Patch(":id")
  @Roles(["super_admin", "admin"])
  async update(@Param("id") id: string, @Body() body: UpdateCustomerDto, @AuthUser() { company }: Users) {
    const customerEntity = await this.customerService.findById(id);
    if (!customerEntity) throw new BadRequestException("Customer not found.")

    if (body.name === "") throw new BadRequestException("Name is required.")

    return this.customerService.update(id, body)
  }

  @Delete(":id")
  @Roles(["super_admin", "admin"])
  async delete(@Param("id") id: string) {
    await this.customerService.deleteRow(id)
  }
}