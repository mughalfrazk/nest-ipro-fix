import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import { Brand } from "./brand.entity";
import { CreateBrand } from "./dto/create-brand.dto";
import { UpdateBrand } from "./dto/update-brand.dto";

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private repo: Repository<Brand>) { }

  async findAll(company_id: string) {
    return this.repo.find({ where: { company: { id: company_id }, deleted_at: IsNull() } })
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ["issues"] })
  }

  async findByName(name: string, company_id) {
    return this.repo.findOne({ where: { name, company: { id: company_id }, deleted_at: IsNull() } })
  }

  async create(payload: CreateBrand, company_id: string) {
    const { name, description } = payload;

    const entity = this.repo.create({ name, description, company: { id: company_id } })
    return this.repo.save(entity)
  }

  async update(id: number, payload: UpdateBrand) {
    await this.repo.update(id, payload)
    return this.findById(id)
  }

  async deleteRow(id: number) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}