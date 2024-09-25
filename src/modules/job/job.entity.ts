import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";
import { Users } from "../users/users.entity";
import { Company } from "../company/company.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer, customer => customer.jobs)
  customer: Customer

  @ManyToOne(() => Users, user => user.jobs)
  technician: Users

  @ManyToOne(() => Company, company => company.jobs)
  company: Company
}