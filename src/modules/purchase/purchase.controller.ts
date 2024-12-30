import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PurchaseService } from "./purchase.service";
import { Roles } from "@/auth/decorators/roles.decorator";

import { CreatePurchasesDto } from "./dto/create-purchase.dto";
import { ExpenseTypeService } from "../expense-type/expense-type.service";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";
import { RoleTypes } from "@/types/roles.types";

@Controller("purchase")
export class PurchaseController {
  constructor(
    private purchaseService: PurchaseService,
    private expenseTypeService: ExpenseTypeService,
  ) { }

  @Get()
  @Roles(["super_admin", "admin"])
  async getPurchaseListBySingleJob(@Query("job_id") job_id: string) {
    if (!job_id) throw new BadRequestException("Job Id is required.")

    return this.purchaseService.findBySingleJobs(job_id)
  }

  @Post()
  @Roles([RoleTypes.SUPER_ADMIN, RoleTypes.ADMIN, RoleTypes.RECEPTIONIST, RoleTypes.ACCOUNTANT, RoleTypes.TECHNICIAN])
  async createMultiplePurchase(@Body() body: CreatePurchasesDto, @AuthUser() user: Users) {
    let expenseTypeEntity = await this.expenseTypeService.getPurchaseExpenseType()
    if (!expenseTypeEntity) {
      expenseTypeEntity = await this.expenseTypeService.create({
        name: "Purchase",
        description: "Default type created for job purchases",
        is_purchase: true
      }, user.company.id)
    }

    return this.purchaseService.createMultiple(body, expenseTypeEntity.id, user)
  }
}