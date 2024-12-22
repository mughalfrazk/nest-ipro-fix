import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Job } from "../job/job.entity";
import { Company } from "../company/company.entity";
import { Invoice } from "../invoice/invoice.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Job, job => job.customer)
  jobs: Job[]

  @OneToMany(() => Invoice, invoice => invoice.customer)
  invoices: Invoice[]

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  company_name: string;

  @ManyToOne(() => Company, company => company.jobs)
  company: Company

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