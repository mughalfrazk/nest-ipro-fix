import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Issue } from "./issue.entity";
import { Repository } from "typeorm";
import { CreateIssueDto } from "./dto/create-issue.dto";

@Injectable()
export class IssueService {
  constructor(@InjectRepository(Issue) private repo: Repository<Issue>) { }

  async create(payload: CreateIssueDto) {
    const { name, model, quantity, charges, total, brand_id, problem_type_id, job_id } = payload;

    const entity = this.repo.create({
      name,
      model,
      total,
      charges,
      quantity,
      brand: {
        id: brand_id
      },
      problem_type: {
        id: problem_type_id
      },
      job: {
        id: job_id
      }
    }
    )
    return this.repo.save(entity)
  }
}