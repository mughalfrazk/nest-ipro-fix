import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { IsNull, Repository } from "typeorm";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) { }

  async findAll() {
    return this.repo.find();
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async findByNameOrPhone(name: string, phone: string) {
    return this.repo.findOne({ where: [{ name }, { phone }] })
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name, deleted_at: IsNull() } })
  }

  async create(payload: CreateCustomerDto, companyId: string) {
    const { name, phone, company_name } = payload;
    const entity = this.repo.create({ name, phone, company_name, company: { id: companyId } })
    return this.repo.save(entity)
  }

  async update(id: string, payload: UpdateCustomerDto) {
    await this.repo.update(id, payload)
    return this.findById(id)
  }

  async deleteRow(id: string) {
    return this.repo.update(id, { deleted_at: new Date() })
  }
}