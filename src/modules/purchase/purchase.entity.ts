import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Job } from "../job/job.entity";
import { Model } from "../model/model.entity";
import { Part } from "../part/part.entity";
import { Supplier } from "../supplier/supplier.entity";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Job, job => job.issues, { nullable: false })
  job: Job

  @Column({ type: "uuid" })
  job_id: string;
  
  @ManyToOne(() => Model, model => model.issues, { nullable: false })
  model: Model

  @Column()
  model_id: number;

  @ManyToOne(() => Part, part => part.purchases, { nullable: false })
  part: Part

  @Column()
  part_id: number;

  @ManyToOne(() => Supplier, supplier => supplier.purchases, { nullable: false })
  supplier: Supplier

  @Column({ type: "uuid" })
  supplier_id: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
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