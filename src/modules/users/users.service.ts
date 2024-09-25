import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) { }

  async findByEmail(email: string): Promise<Users> {
    return this.repo.findOne({ where: { email, deleted_at: IsNull() }, relations: ['role'] })
  }

  async findByEmailWithPassword(email: string): Promise<Users> {
    return this.repo.findOne({ select: ['id', 'email', 'password', 'first_name', 'last_name'], where: { email, deleted_at: IsNull() }, relations: ['role'] })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ['role', 'company'] })
  }

  async create(user: Partial<Users>) {
    const { first_name, last_name, email, password } = user

    const entity = this.repo.create({ first_name, last_name, email, password })
    return this.repo.save(entity)
  }


}
