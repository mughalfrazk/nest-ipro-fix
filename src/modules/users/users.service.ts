import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { IsNull, Repository } from 'typeorm';
import { SignUpDto } from '@/auth/dtos/sign-up.dto';

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

  async create(user: SignUpDto, company_id: string) {
    const { first_name, last_name, email, password, role_id } = user

    const entity = this.repo.create({ first_name, last_name, email, password, role: { id: role_id }, company: { id: company_id } })
    return this.repo.save(entity)
  }


}
