import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Users } from "../users/users.entity";
import { Job } from "../job/job.entity";

@Entity()
export class ProblemType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Users, users => users.speciality)
  users: Users[]

  @OneToMany(() => Job, job => job.problem_type)
  jobs: Job[]

  @Column()
  name: string;

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