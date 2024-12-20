import { IsNull, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { InvoiceStatus } from "./invoice-status.entity";
import { invoiceStatusSeeder } from "./invoice-status.seeder";

@Injectable()
export class InvoiceStatusService {
  constructor(@InjectRepository(InvoiceStatus) private repo: Repository<InvoiceStatus>) { }

  async findAll() {
    return this.repo.find({ where: { deleted_at: IsNull() }, order: { created_at: "DESC" } })
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } })
  }

  async seed() {
    try {
      let dataArray = []

      for (let i = 0; i < invoiceStatusSeeder.length; i++) {
        const element = invoiceStatusSeeder[i];
        const entity = await this.findByName(element)
        if (!entity) dataArray.push({ name: element })
      }

      if (dataArray.length) await this.repo.save(dataArray)
      console.log("Data seeded => Invoice Status")
    } catch (error) {
      console.log("Error while seeding invoice status: ", error)
    }
  }
}