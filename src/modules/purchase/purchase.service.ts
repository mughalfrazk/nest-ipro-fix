import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Purchase } from "./purchase.entity";
import { Repository } from "typeorm";
import { CreatePurchasesDto } from "./dto/create-purchase.dto";

@Injectable()
export class PurchaseService {
  constructor(@InjectRepository(Purchase) private repo: Repository<Purchase>) { }

  async findById(purchase_id: string) {
    return this.repo.findOne({ where: { id: purchase_id } })
  }

  async findByParts(parts: string) {
    return this.repo.findOne({ where: { parts } })
  }

  async findByJobs(job_id: string) {
    return this.repo.find({ where: { job: { id: job_id } }, relations: ["brand"] })
  }

  async createMultiple(payload: CreatePurchasesDto) {
    const { purchases, job_id } = payload;

    const entity = purchases.map(({ brand_id, model, quantity, charges, total, parts }) => this.repo.create({
      brand: { id: brand_id },
      job: { id: job_id },
      model,
      quantity,
      charges,
      total,
      parts
    }))

    return this.repo.save(entity)
  }
}
