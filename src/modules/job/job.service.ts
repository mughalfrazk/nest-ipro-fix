import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Job } from "./job.entity";
import { CreateJobDto } from "./dto/create-job.dto";

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private repo: Repository<Job>) { }

  async getAllCompanyJobs(companyId: string) {
    return this.repo.find({ select: ["id", "customer"], where: { company: { id: companyId } }, relations: ["customer", "technician", "job_status", "issues"] })
  }

  async create(payload: CreateJobDto, job_status_id: number, company_id: string) {
    const { customer_id, technician_id, problem_type_id, customer, issues } = payload
    const entity = this.repo.create({
      company: { id: company_id },
      technician: { id: technician_id },
      customer: customer_id ? { id: customer_id } : customer,
      problem_type: { id: problem_type_id },
      job_status: { id: job_status_id },
      issues,

    })
    return this.repo.save(entity)
  }
}