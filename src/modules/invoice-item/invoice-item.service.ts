import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import { InvoiceItem } from "./invoice-item.entity";
import { CreateInvoiceItem } from "./dto/create-invoice-item.dto";
import { Users } from "../users/users.entity";

@Injectable()
export class InvoiceItemService {
  constructor(@InjectRepository(InvoiceItem) private repo: Repository<InvoiceItem>) { }

  async findAll(company_id: string) {
    // return this.repo.find({ where: { company: { id: company_id }, deleted_at: IsNull() }, relations: ["expense_type", "created_by"] })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ["expense_type", "created_by"] })
  }

  async create(payload: CreateInvoiceItem, user: Users) {
    // const { comments, amount, expense_type_id } = payload;

    // const entity = this.repo.create({ 
    //   comments,
    //   amount,
    //   expense_type: { id: expense_type_id },
    //   company: { id: user.company.id },
    //   created_by: { id: user.id }
    // })
    // return this.repo.save(entity)
  }

  // async update(id: number, payload: UpdateExpenseType) {
  //   await this.repo.update(id, payload)
  //   return this.findById(id)
  // }

  async deleteRow(id: string) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}