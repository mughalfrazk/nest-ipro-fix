import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { SignUpDto } from '@/auth/dtos/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) { }

  async findByRoleAndSpeciality(company_id: string, role_id?: string, speciality_id?: string): Promise<Users[]> {
    let where: FindOptionsWhere<Users> = {};
    where.company = { id: company_id }

    if (role_id) {
      where.role = { id: role_id }
    }

    if (speciality_id) {
      where.speciality = { id: speciality_id }
    }

    console.log(where)

    return this.repo.find({ where })
  }

  async findByEmail(email: string): Promise<Users> {
    return this.repo.findOne({ where: { email, deleted_at: IsNull() }, relations: ['role'] })
  }

  async findByEmailWithPassword(email: string): Promise<Users> {
    return this.repo.findOne({ select: ['id', 'email', 'password', 'first_name', 'last_name'], where: { email, deleted_at: IsNull() } })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ['role', 'company'] })
  }

  async create(user: SignUpDto, company_id: string) {
    const { first_name, last_name, email, password, role_id, speciality_id } = user

    const entity = this.repo.create({ first_name, last_name, email, password, role: { id: role_id }, company: { id: company_id }, speciality: { id: speciality_id } })
    return this.repo.save(entity)
  }


}
