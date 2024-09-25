import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProblemType } from "./problem-type.entity";
import { Repository } from "typeorm";
import { problemTypeSeeder } from "./problem-type.seeder";

@Injectable()
export class ProblemTypeService {
  constructor(@InjectRepository(ProblemType) private repo: Repository<ProblemType>) { }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } })
  }

  async findAll() {
    return this.repo.find();
  }

  async seed() {
    try {
      let dataArray = []

      for (let i = 0; i < problemTypeSeeder.length; i++) {
        const element = problemTypeSeeder[i];
        const entity = await this.findByName(element)
        if (!entity) dataArray.push({ name: element })
      }

      if (dataArray.length) await this.repo.save(dataArray)
      console.log("Data seeded => Problem Type")
    } catch (error) {
      console.log("Error while seeding prodlem types: ", error)
    }
  }
}