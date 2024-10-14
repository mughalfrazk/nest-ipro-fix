import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Customer } from "../customer/customer.entity";
import { Users } from "../users/users.entity";
import { Company } from "../company/company.entity";
import { Issue } from "../issue/issue.entity";
import { JobStatus } from "../job-status/job-status.entity";
import { ProblemType } from "../problem-type/problem-type.entity";

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

  @ManyToOne(() => Users, user => user.jobs, { nullable: false })
  technician: Users

  @ManyToOne(() => Company, company => company.jobs)
  company: Company

  @OneToMany(() => Issue, issue => issue.job, { cascade: ["insert"] })
  issues: Issue[]
}