import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Issue } from "./issue.entity";
import { IsNull, Repository } from "typeorm";
import { CreateIssueDto } from "./dto/create-issue.dto";
import { UpdateIssueDto } from "./dto/update-issue.dto";

@Injectable()
export class IssueService {
  constructor(@InjectRepository(Issue) private repo: Repository<Issue>) { }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async create(payload: CreateIssueDto, job_id: string) {
    const { model_id, quantity, charges, total, brand_id, problem_id } = payload;

    const entity = this.repo.create({
      problem: { id: problem_id },
      model: { id: model_id },
      brand: { id: brand_id },
      job: { id: job_id },
      quantity,
      charges,
      total,
    }
    )
    return this.repo.save(entity)
  }

  async update(id: string, payload: UpdateIssueDto, job_id: string) {
    await this.repo.update(id, { ...payload, job_id })
  }

  async deleteRow(id: string) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}