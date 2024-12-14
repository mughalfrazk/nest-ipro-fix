import { IsNull, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { JobStatus } from "./job-status.entity";
import { jobStatusSeeder } from "./job.status.seeder";

@Injectable()
export class JobStatusService {
  constructor(@InjectRepository(JobStatus) private repo: Repository<JobStatus>) { }

  async findAll() {
    return this.repo.find({ where: { deleted_at: IsNull() }, order: { created_at: "DESC" } })
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } })
  }

  async seed() {
    try {
      let dataArray = []

      for (let i = 0; i < jobStatusSeeder.length; i++) {
        const element = jobStatusSeeder[i];
        const entity = await this.findByName(element)
        if (!entity) dataArray.push({ name: element })
      }

      if (dataArray.length) await this.repo.save(dataArray)
      console.log("Data seeded => Job Status")
    } catch (error) {
      console.log("Error while seeding prodlem types: ", error)
    }
  }
}