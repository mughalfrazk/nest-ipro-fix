import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../users/users.entity";
import { Supplier } from "../supplier/supplier.entity";
import { Job } from "../job/job.entity";
import { Customer } from "../customer/customer.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Users, users => users.company)
  users: Users[]

  @OneToMany(() => Supplier, supplier => supplier.company)
  suppliers: Supplier[]

  @OneToMany(() => Job, job => job.company)
  jobs: Job[]

  @OneToMany(() => Customer, customer => customer.company)
  customers: Customer[]

  @Column()
  name: string;

  @Column({ nullable: true })
  logo: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}