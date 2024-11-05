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
    where.company = { id: company_id, deleted_at: IsNull() }

    if (role_id) {
      where.role = { id: role_id }
    }

    if (speciality_id) {
      where.speciality = { id: speciality_id }
    }

    return this.repo.find({ where, relations: ["role", "company", "speciality"] })
  }

  async findByRoleAndSpecialityWithJobs(company_id: string, role_id?: string, speciality_id?: string): Promise<Users[]> {
    let where: FindOptionsWhere<Users> = {};
    where.company = { id: company_id, deleted_at: IsNull() }

    if (role_id) {
      where.role = { id: role_id }
    }

    if (speciality_id) {
      where.speciality = { id: speciality_id }
    }

    return this.repo.find({ where, relations: ["role", "company", "speciality", "jobs"] })
  }

  async findByEmail(email: string): Promise<Users> {
    return this.repo.findOne({ where: { email, deleted_at: IsNull() }, relations: ['role'] })
  }

  async findByEmailWithPassword(email: string): Promise<Users> {
    return this.repo.findOne({ select: ['id', 'email', 'password', 'first_name', 'last_name'], where: { email, deleted_at: IsNull() } })
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ['role', 'company', "speciality"] })
  }

  async create(user: SignUpDto, company_id: string) {
    const { first_name, last_name, email, password, target, phone, role_id, speciality_id } = user
    console.log(user)
    // return
    const entity = this.repo.create({ 
      first_name,
      last_name,
      target: +target,
      phone,
      email,
      password, 
      role: { id: role_id },
      company: { id: company_id },
      speciality: { id: speciality_id }
    })
    return this.repo.save(entity)
  }
}
