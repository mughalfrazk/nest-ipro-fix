import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Customer } from "../customer/customer.entity";
import { Users } from "../users/users.entity";
import { Company } from "../company/company.entity";
import { Issue } from "../issue/issue.entity";
import { JobStatus } from "../job-status/job-status.entity";
import { ProblemType } from "../problem-type/problem-type.entity";
import { Purchase } from "../purchase/purchase.entity";
import { Comment } from "../comment/comment.entity";
import { Invoice } from "../invoice/invoice.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ProblemType, problem_type => problem_type.jobs, { nullable: false })
  problem_type: ProblemType

  @ManyToOne(() => JobStatus, job_status => job_status.jobs, { nullable: false })
  job_status: JobStatus

  @ManyToOne(() => Customer, customer => customer.jobs, { cascade: ["insert"] })
  customer: Customer

  @ManyToOne(() => Users, user => user.jobs, { nullable: true })
  technician: Users

  @ManyToOne(() => Company, company => company.jobs)
  company: Company

  @OneToMany(() => Issue, issue => issue.job, { cascade: ["insert"] })
  issues: Issue[]

  @OneToMany(() => Purchase, purchase => purchase.job, { cascade: ["insert"] })
  purchases: Purchase[]

  @OneToMany(() => Comment, comment => comment.job)
  comments: Comment[]

  @OneToOne(() => Invoice, invoice => invoice.job)
  invoice: Invoice

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