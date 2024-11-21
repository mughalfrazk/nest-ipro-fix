import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "./model.entity";
import { Repository } from "typeorm";
import { CreateModel } from "./dto/create-model.dto";
import { modelSeeder } from "./model.seeder";

@Injectable()
export class ModelService {
  constructor(@InjectRepository(Model) private repo: Repository<Model>) { }

  async findAll() {
    return this.repo.find()
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } })
  }

  async create(payload: CreateModel) {
    const { name, description } = payload;

    const entity = this.repo.create({ name, description })
    return this.repo.save(entity)
  }

  async seed() {
    try {
      let dataArray = []

      for (let i = 0; i < modelSeeder.length; i++) {
        const element = modelSeeder[i];
        const entity = await this.findByName(element.name)
        if (!entity) dataArray.push(element)
      }

      if (dataArray.length) await this.repo.save(dataArray)
      console.log("Data seeded => Model")
    } catch (error) {
      console.log("Error while seeding models: ", error)
    }
  }
}