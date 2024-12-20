import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { InvoiceStatusService } from "./invoice-status.service"

@ApiTags("Invoice Status")
@Controller("invoice-status")
export class InvoiceStatusController {
  constructor(private invoiceStatusService: InvoiceStatusService) { }

  @Get()
  async getAll() {
    return this.invoiceStatusService.findAll()
  }
}