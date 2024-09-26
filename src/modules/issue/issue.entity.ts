import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProblemType } from "../problem-type/problem-type.entity";
import { Brand } from "../brand/brand.entity";
import { Job } from "../job/job.entity";

@Entity()
export class Issue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Job, job => job.issues, { nullable: false })
  job: Job

  @Column({ type: "uuid" })
  job_id: string;

  @ManyToOne(() => ProblemType, problem_type => problem_type.issues, { nullable: false })
  problem_type: ProblemType
  
  @Column({ type: "uuid" })
  problem_type_id: string;

  @ManyToOne(() => Brand, brand => brand.issues, { nullable: false })
  brand: Brand

  @Column()
  brand_id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  quantity: number;

  @Column()
  charges: number;

  @Column()
  total: number;

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