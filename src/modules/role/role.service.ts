import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { IsNull, Repository } from "typeorm";
import { roleSeeder } from "./role.seeder";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) { }

  async findAll() {
    return this.repo.find()
  }

  async findByName(name: string): Promise<Role> {
    return this.repo.findOne({ where: { name, deleted_at: IsNull() } })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async seed() {
    try {
      let dataArray = []

      for (let i = 0; i < roleSeeder.length; i++) {
        const element = roleSeeder[i];
        const entity = await this.findByName(element)
        if (!entity) dataArray.push({ name: element })
      }

      if (dataArray.length) await this.repo.save(dataArray)
      console.log("Data seeded => Roles")
    } catch (error) {
      console.log("Error while seeding roles: ", error)
    }
  }
}