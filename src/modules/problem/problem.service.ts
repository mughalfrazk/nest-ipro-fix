import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Problem } from "./problem.entity";
import { Repository } from "typeorm";
import { CreateProblem } from "./dto/create-problem.dto";
import { problemSeeder } from "./problem.seeder";

@Injectable()
export class ProblemService {
  constructor(@InjectRepository(Problem) private repo: Repository<Problem>) { }

  async findAll() {
    return this.repo.find()
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } })
  }

  async create(payload: CreateProblem) {
    const { name, description } = payload;

    const entity = this.repo.create({ name, description })
    return this.repo.save(entity)
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