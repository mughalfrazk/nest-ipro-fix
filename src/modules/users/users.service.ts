import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { IsNull, Repository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) { }

  async findByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email, deleted_at: IsNull() } })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() } })
  }

  async create(user: Partial<Users>) {
    const { first_name, last_name, email, password } = user

    const entity = this.repo.create({ first_name, last_name, email, password })
    return this.repo.save(entity)
  }
}
