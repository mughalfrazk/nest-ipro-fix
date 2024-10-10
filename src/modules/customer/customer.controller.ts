import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomerService } from "./customer.service";
import { Roles } from "@/auth/decorators/roles.decorator";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";

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
}