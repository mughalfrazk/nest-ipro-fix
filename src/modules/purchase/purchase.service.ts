import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Purchase } from "./purchase.entity";
import { Repository } from "typeorm";
import { CreatePurchasesDto } from "./dto/create-purchase.dto";
import { Users } from "../users/users.entity";

@Injectable()
export class PurchaseService {
  constructor(@InjectRepository(Purchase) private repo: Repository<Purchase>) { }

  async findById(purchase_id: string) {
    return this.repo.findOne({ where: { id: purchase_id } })
  }

  async findBySingleJobs(job_id: string) {
    return this.repo.find({ where: { job: { id: job_id } } })
  }

  async createMultiple(payload: CreatePurchasesDto, expense_type_id: number, user: Users) {
    const { purchases, job_id } = payload;

    const entity = purchases.map(({ model_id, supplier_id, part_id, quantity, total }) => this.repo.create({
      job: { id: job_id },
      model: { id: model_id },
      supplier: { id: supplier_id },
      part: { id: part_id },
      quantity,
      total,
      expense: {
        amount: total,
        comments: "",
        expense_type: { id: expense_type_id },
        created_by: { id: user.id },
        company: { id: user.company.id },
      }
    }))

    return this.repo.save(entity)
  }
}
