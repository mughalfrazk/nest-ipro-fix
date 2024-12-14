import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

import { Job } from "./job.entity";
import { CreateJobDto } from "./dto/create-job.dto";

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private repo: Repository<Job>) { }

  async findById(job_id: string, company_id: string) {
    return this.repo.find({ where: { id: job_id, company: { id: company_id }, deleted_at: IsNull() }, relations: ["customer", "technician", "job_status", "issues", "purchases", "problem_type"] })
  }

  async getAllCompanyJobs(company_id: string) {
    return this.repo.find({ select: ["id", "customer", "created_at", "updated_at"], where: { company: { id: company_id }, deleted_at: IsNull() }, relations: ["customer", "technician", "job_status", "issues", "problem_type"] })
  }

  async create(payload: CreateJobDto, job_status_id: number, company_id: string) {
    const { customer_id, technician_id, problem_type_id, customer, issues } = payload
    let entity

    if (technician_id) {
      entity = this.repo.create({
        company: { id: company_id },
        technician: { id: technician_id },
        customer: customer_id === "new" ? customer : { id: customer_id },
        problem_type: { id: problem_type_id },
        job_status: { id: job_status_id },
        issues,
      })
    } else {
      entity = this.repo.create({
        company: { id: company_id },
        customer: customer_id === "new" ? customer : { id: customer_id },
        problem_type: { id: problem_type_id },
        job_status: { id: job_status_id },
        issues,
      })
    }


    return this.repo.save(entity)
  }
}