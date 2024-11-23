import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Problem } from "./problem.entity";
import { IsNull, Repository } from "typeorm";
import { CreateProblem } from "./dto/create-problem.dto";
import { problemSeeder } from "./problem.seeder";
import { UpdateProblem } from "./dto/update-problem.dto";

@Injectable()
export class ProblemService {
  constructor(@InjectRepository(Problem) private repo: Repository<Problem>) { }

  async findAll() {
    return this.repo.find({ where: { deleted_at: IsNull() }, order: { created_at: "ASC" } })
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name, deleted_at: IsNull() } })
  }
  async create(payload: CreateProblem) {
    const { name, description } = payload;

    const entity = this.repo.create({ name, description })
    return this.repo.save(entity)
  }

  async update(id: number, payload: UpdateProblem) {
    await this.repo.update(id, payload)
    return this.findById(id)
  }

  async deleteRow(id: string) {
    return this.repo.update(id, { deleted_at: new Date() })
  }

  async seed() {
    try {
      let dataArray = []

      for (let i = 0; i < problemSeeder.length; i++) {
        const element = problemSeeder[i];
        const entity = await this.findByName(element.name)
        if (!entity) dataArray.push(element)
      }

      if (dataArray.length) await this.repo.save(dataArray)
      console.log("Data seeded => Problem")
    } catch (error) {
      console.log("Error while seeding problems: ", error)
    }
  }
}