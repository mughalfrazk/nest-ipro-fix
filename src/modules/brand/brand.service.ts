import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "./brand.entity";
import { Repository } from "typeorm";
import { CreateBrand } from "./dto/create-brand.dto";

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
}