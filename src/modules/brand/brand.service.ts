import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "./brand.entity";
import { Repository } from "typeorm";
import { CreateBrand } from "./dto/create-brand.dto";
import { brandSeeder } from "./brand.seeder";

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private repo: Repository<Brand>) { }

  async findAll() {
    return this.repo.find()
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } })
  }

  async create(payload: CreateBrand) {
    const { name, description } = payload;

    const entity = this.repo.create({ name, description })
    return this.repo.save(entity)
  }

  async seed() {
    try {
      let dataArray = []

      for (let i = 0; i < brandSeeder.length; i++) {
        const element = brandSeeder[i];
        const entity = await this.findByName(element.name)
        if (!entity) dataArray.push(element)
      }

      if (dataArray.length) await this.repo.save(dataArray)
      console.log("Data seeded => Brand")
    } catch (error) {
      console.log("Error while seeding brands: ", error)
    }
  }
}