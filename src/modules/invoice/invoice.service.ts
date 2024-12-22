import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { Users } from "../users/users.entity";
import { Invoice } from "./invoice.entity";

@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private repo: Repository<Invoice>) { }

  async findAll(company_id: string) {
    return this.repo.find({ where: { company: { id: company_id }, deleted_at: IsNull() }, relations: ["expense_type", "created_by"] })
  }

  async findByJobId(job_id: string, company_id: string) {
    if (!job_id) return null;

    return this.repo.findOne({
      where: {
        job: { id: job_id },
        company: { id: company_id },
        deleted_at: IsNull()
      },
      relations: [
        "technician",
        "customer",
        "invoice_status",
        "created_by",
        "invoice_items.brand",
        "invoice_items.issue_model",
        "invoice_items.purchase_model",
        "invoice_items.part"
      ]
    })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ["expense_type", "created_by"] })
  }

  async create(payload: CreateInvoiceDto, invoice_status_id: number, user: Users) {
    const { technician_id, job_id, customer_id, issue_total, purchase_total, total, invoice_items } = payload

    const entity = this.repo.create({
      invoice_status: { id: invoice_status_id },
      technician: { id: technician_id },
      company: { id: user.company.id },
      customer: { id: customer_id },
      created_by: { id: user.id },
      job: { id: job_id },
      issue_total,
      purchase_total,
      total,
      invoice_items
    })

    return this.repo.save(entity)
  }

  // async update(id: number, payload: UpdateExpenseType) {
  //   await this.repo.update(id, payload)
  //   return this.findById(id)
  // }

  async deleteRow(id: string) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}