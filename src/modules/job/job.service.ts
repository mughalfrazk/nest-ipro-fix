import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Job } from "./job.entity";
import { CreateJobDto } from "./dto/create-job.dto";

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private repo: Repository<Job>) { }

  async getAllCompanyJobs(companyId: string) {
    return this.repo.find({ where: { company: { id: companyId } }, relations: ["customer", "technician", "issues.problem_type", "issues.brand"] })
  }

  async create(payload: CreateJobDto, companyId: string) {
    const { customerId, technicianId, issues } = payload
    const entity = this.repo.create({ company: { id: companyId }, technician: { id: technicianId }, customer: { id: customerId }, issues })
    return this.repo.save(entity)
  }
}