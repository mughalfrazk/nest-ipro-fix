import { Injectable } from "@nestjs/common";
import { Supplier } from "./supplier.entity";
import { IsNull, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";

@Injectable()
export class SupplierService {
  constructor(@InjectRepository(Supplier) private repo: Repository<Supplier>) { }

  async getAllByCompany(company_id: string) {
    return this.repo.find({ where: { company: { id: company_id } } })
  }

  async findInCompanyByName(name: string, company_id: string) {
    const entity = await this.repo.findOne({ where: { name, company: { id: company_id } } })
    return !!entity
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name, deleted_at: IsNull() } })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ["purchases"] })
  }

  async findAllPurchasesBySupplier(company_id: string) {
    return this.repo.find({ where: { company: { id: company_id } }, relations: ["purchases.part"] })
  }

  async create(supplier: Partial<Supplier>) {
    const entity = this.repo.create(supplier)
    return this.repo.save(entity)
  }

  async update(id: string, payload: UpdateSupplierDto) {
    await this.repo.update(id, payload)
    return this.findById(id)
  }

  async deleteRow(id: string) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}