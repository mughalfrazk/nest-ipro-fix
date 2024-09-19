import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./company.entity";
import { IsNull, Repository } from "typeorm";
import { companySeeder } from "./company.seeder";

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private repo: Repository<Company>) { }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name, deleted_at: IsNull() } })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async seed() {
    try {
      let dataArray = []

      for (let i = 0; i < companySeeder.length; i++) {
        const element = companySeeder[i];
        const entity = await this.findByName(element.name)
        if (!entity) dataArray.push(element)
      }

      if (dataArray.length) await this.repo.save(dataArray)
      console.log("Data seeded => Company")
    } catch (error) {
      console.log("Error while seeding companies: ", error)
    }
  }
}