import { IsNull, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

import { Part } from "./part.entity";
import { CreatePart } from "./dto/create-part.dto";
import { UpdatePart } from "./dto/update-part.dto";

@Injectable()
export class PartService {
  constructor(@InjectRepository(Part) private repo: Repository<Part>) { }

  async findAll(company_id: string) {
    return this.repo.find({ where: { company: { id: company_id }, deleted_at: IsNull() }, order: { created_at: "DESC" } })
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async findByName(name: string, company_id: string) {
    return this.repo.findOne({ where: { name, company: { id: company_id }, deleted_at: IsNull() } })
  }
  async create(payload: CreatePart, company_id: string) {
    const { name, description } = payload;

    const entity = this.repo.create({ name, description, company: { id: company_id } })
    return this.repo.save(entity)
  }

  async update(id: number, payload: UpdatePart) {
    await this.repo.update(id, payload)
    return this.findById(id)
  }

  async deleteRow(id: string) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}