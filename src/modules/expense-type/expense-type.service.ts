import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import { ExpenseType } from "./expense-type.entity";
import { CreateExpenseType } from "./dto/create-expense-type.dto";
import { UpdateExpenseType } from "./dto/update-expense-type.dto";

@Injectable()
export class ExpenseTypeService {
  constructor(@InjectRepository(ExpenseType) private repo: Repository<ExpenseType>) { }

  async findAll(company_id: string) {
    return this.repo.find({ where: { company: { id: company_id }, deleted_at: IsNull() } })
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ["expenses"] })
  }

  async getPurchaseExpenseType() {
    return this.repo.findOne({ where: { is_purchase: true } })
  }

  async findByName(name: string, company_id: string) {
    return this.repo.findOne({ where: { name, company: { id: company_id }, deleted_at: IsNull() } })
  }

  async create(payload: CreateExpenseType, company_id: string) {
    const { name, description, is_purchase } = payload;

    const entity = this.repo.create({ name, description, is_purchase, company: { id: company_id } })
    return this.repo.save(entity)
  }

  async update(id: number, payload: UpdateExpenseType) {
    await this.repo.update(id, payload)
    return this.findById(id)
  }

  async deleteRow(id: number) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}