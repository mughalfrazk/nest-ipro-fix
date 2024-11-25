import { BadRequestException, Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PurchaseService } from "./purchase.service";
import { Roles } from "@/auth/decorators/roles.decorator";

import { CreatePurchasesDto } from "./dto/create-purchase.dto";
import { JobService } from "../job/job.service";

@Controller("purchase")
export class PurchaseController {
  constructor(
    private purchaseService: PurchaseService
  ) { }

  @Get()
  @Roles(["super_admin", "admin"])
  async getByJob(@Query("job_id") job_id: string) {
    if (!job_id) throw new BadRequestException("Job Id is required.")

    return this.purchaseService.findByJobs(job_id)
  }

  @Post()
  @Roles(["super_admin", "admin"])
  async createMultiplePurchase(@Body() body: CreatePurchasesDto) {
    // let payload: CreatePurchasesDto = { purchases: [], job_id: body.job_id }

    // for (let i = 0; i < body.purchases.length; i++) {
    //   payload.purchases.push(body.purchases[i])
    // }

    return this.purchaseService.createMultiple(body)
  }
}