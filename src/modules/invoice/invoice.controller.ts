import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthUser } from "@/decorators/auth-user.decorator";
import { InvoiceService } from "./invoice.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { Users } from "@/modules/users/users.entity";
import { InvoiceStatusService } from "../invoice-status/invoice-status.service";
import { JobStatusService } from "../job-status/job-status.service";
import { JobService } from "../job/job.service";

@ApiTags("Invoice")
@Controller("invoice")
export class InvoiceController {
  constructor(
    private invoiceService: InvoiceService,
    private jobService: JobService,
    private jobStatusService: JobStatusService,
    private invoiceStatusService: InvoiceStatusService
  ) { }

  @Get()
  async getInvoiceByJobId(@Query("job_id") job_id: string, @AuthUser() { company }: Users) {
    const invoice = await this.invoiceService.findByJobId(job_id, company.id)
    if (!invoice) return null

    let structured_invoice = {
      id: invoice.id,
      issue_total: invoice.issue_total,
      purchase_total: invoice.purchase_total,
      total: invoice.total,
      barcode: invoice.barcode,
      created_at: invoice.created_at,
      updated_at: invoice.updated_at,
      deleted_at: invoice.deleted_at,
      technician: invoice.technician,
      customer: invoice.customer,
      invoice_status: invoice.invoice_status,
      created_by: invoice.created_by
    }
    structured_invoice["issues"] = invoice.invoice_items.filter(item => item.item_type === "issue")
    structured_invoice["purchases"] = invoice.invoice_items.filter(item => item.item_type === "purchase")

    structured_invoice["issues"] = structured_invoice["issues"].map(item => ({
      id: item.id,
      item_type: item.item_type,
      charges: item.charges,
      quantity: item.quantity,
      total: item.total,
      brand: {
        id: item.brand.id,
        name: item.brand_name
      },
      model: {
        id: item.issue_model.id,
        name: item.issue_model_name
      },
      problem: {
        id: item.issue_model.id,
        name: item.problem_name
      }
    }))
    structured_invoice["purchases"] = structured_invoice["purchases"].map(item => ({
      id: item.id,
      item_type: item.item_type,
      quantity: item.quantity,
      total: item.total,
      model: {
        id: item.purchase_model.id,
        name: item.purchase_model_name
      },
      part: {
        id: item.part.id,
        name: item.part_name
      }
    }))

    return structured_invoice
  }

  @Get("all")
  async getAllCompanyInvoices(@Query("stats") stats: number, @AuthUser() { company }: Users) {
    const invoices = await this.invoiceService.findAll(company.id)

    const responses: { invoices: typeof invoices, stats?: { total_invoices: number, total_amount: number, total_pending: number, total_paid: number } } = {
      invoices,
      stats: {
        total_invoices: 0,
        total_amount: 0,
        total_pending: 0,
        total_paid: 0
      }
    }

    if (!!stats && !!invoices.length) {
      responses["stats"] = {
        total_invoices: invoices.length,
        total_amount: invoices.reduce((prev, curr) => prev + curr.total, 0),
        total_pending: invoices.reduce((prev, curr) => curr.invoice_status.name === "Pending Payment" ? prev + 1 : prev, 0),
        total_paid: invoices.reduce((prev, curr) => curr.invoice_status.name === "Paid" ? prev + 1 : prev, 0)
      }
    }

    return responses
  }

  @Post()
  async create(@Body() body: CreateInvoiceDto, @AuthUser() user: Users) {
    const invoice = await this.invoiceService.findByJobId(body.job_id, user.company.id)
    if (!!invoice) throw new BadRequestException("Invoice already generated.")

    const jobStatus = await this.jobStatusService.findByName("Job Done")

    const job = await this.jobService.findById(body.job_id, user.company.id)
    if (job.job_status.id !== jobStatus.id) throw new BadRequestException("Can't generate invoice, job is not done yet.")


    const invoiceStatus = await this.invoiceStatusService.findByName("Generated")
    if (!invoiceStatus) throw new InternalServerErrorException("Error regarding invoice status.")

    return this.invoiceService.create(body, invoiceStatus.id, user)
  }
}