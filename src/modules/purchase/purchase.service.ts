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

  async findByJobs(job_id: string) {
    return this.repo.find({ where: { job: { id: job_id } }, relations: ["brand"] })
  }

  async createMultiple(payload: CreatePurchasesDto) {
    const { purchases, job_id } = payload;

    const entity = purchases.map(({ brand_id, model_id, supplier_id, part_id, quantity, charges, total }) => this.repo.create({
      job: { id: job_id },
      model: { id: model_id },
      supplier: { id: supplier_id },
      brand: { id: brand_id },
      part: { id: part_id },
      quantity,
      charges,
      total
    }))

    return this.repo.save(entity)
  }
}
