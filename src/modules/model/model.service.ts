import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "./model.entity";
import { IsNull, Repository } from "typeorm";
import { CreateModel } from "./dto/create-model.dto";
import { modelSeeder } from "./model.seeder";
import { UpdateModel } from "./dto/update-model.dto";

@Injectable()
export class ModelService {
  constructor(@InjectRepository(Model) private repo: Repository<Model>) { }

  async findAll() {
    return this.repo.find({ where: { deleted_at: IsNull() } })
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name, deleted_at: IsNull() } })
  }
  async create(payload: CreateModel) {
    const { name, description } = payload;

    const entity = this.repo.create({ name, description })
    return this.repo.save(entity)
  }

  async update(id: number, payload: UpdateModel) {
    await this.repo.update(id, payload)
    return this.findById(id)
  }

  async deleteRow(id: string) {
    return this.repo.update(id, { deleted_at: new Date() })
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