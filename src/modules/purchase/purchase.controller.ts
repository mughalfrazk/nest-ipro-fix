import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PurchaseService } from "./purchase.service";
import { Roles } from "@/auth/decorators/roles.decorator";

import { CreatePurchasesDto } from "./dto/create-purchase.dto";
import { AuthUser } from "@/decorators/auth-user.decorator";
import { Users } from "../users/users.entity";

@Controller("purchase")
export class PurchaseController {
  constructor(
    private purchaseService: PurchaseService
  ) { }

  @Get()
  @Roles(["super_admin", "admin"])
  async getPurchaseListBySingleJob(@Query("job_id") job_id: string) {
    if (!job_id) throw new BadRequestException("Job Id is required.")

    return this.purchaseService.findBySingleJobs(job_id)
  }

  @Post()
  @Roles(["super_admin", "admin"])
  async createMultiplePurchase(@Body() body: CreatePurchasesDto) {
    return this.purchaseService.createMultiple(body)
  }
}