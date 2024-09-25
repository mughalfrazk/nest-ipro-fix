import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/create-customer.dto";

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) { }

  async create(payload: CreateCustomerDto, companyId: string) {
    const { name, phone, company_name } = payload;
    const entity = this.repo.create({ name, phone, company_name, company: { id: companyId } })
    return this.repo.save(entity)
  }
}