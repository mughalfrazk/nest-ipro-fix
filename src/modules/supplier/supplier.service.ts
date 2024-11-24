import { Injectable } from "@nestjs/common";
import { Supplier } from "./supplier.entity";
import { IsNull, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SupplierService {
  constructor(@InjectRepository(Supplier) private repo: Repository<Supplier>) { }

  async getAllByCompany(company_id: string) {
    return this.repo.find({ where: { company: { id: company_id } } })
  }

  async findInCompanyByName(name: string, company_id: string) {
    const entity = await this.repo.findOne({ where: { name, company: { id: company_id } } })
    console.log(entity)
    return !!entity
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name, deleted_at: IsNull() } })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async create(supplier: Partial<Supplier>) {
    const entity = this.repo.create(supplier)
    return this.repo.save(entity)
  }
}