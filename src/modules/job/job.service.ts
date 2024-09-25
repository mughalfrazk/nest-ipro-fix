import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { Repository } from "typeorm";
import { CreateJobDto } from "./dto/create-job.dto";

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private repo: Repository<Job>) { }

  async create(payload: CreateJobDto, companyId: string) {
    const { customerId, technicianId } = payload
    const entity = this.repo.create({ company: { id: companyId }, technician: { id: technicianId }, customer: { id: customerId } })
    return this.repo.save(entity)
  }
}