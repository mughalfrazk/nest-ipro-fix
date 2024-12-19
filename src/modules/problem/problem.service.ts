import { IsNull, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

import { Problem } from "./problem.entity";
import { CreateProblem } from "./dto/create-problem.dto";
import { UpdateProblem } from "./dto/update-problem.dto";

@Injectable()
export class ProblemService {
  constructor(@InjectRepository(Problem) private repo: Repository<Problem>) { }

  async findAll(company_id: string) {
    return this.repo.find({ where: { company: { id: company_id }, deleted_at: IsNull() }, order: { created_at: "ASC" } })
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ["issues"] })
  }

  async findByName(name: string, company_id: string) {
    return this.repo.findOne({ where: { name, company: { id: company_id }, deleted_at: IsNull() } })
  }

  async create(payload: CreateProblem, company_id: string) {
    const { name, description } = payload;

    const entity = this.repo.create({ name, description, company: { id: company_id } })
    return this.repo.save(entity)
  }

  async update(id: number, payload: UpdateProblem) {
    await this.repo.update(id, payload)
    return this.findById(id)
  }

  async deleteRow(id: number) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}