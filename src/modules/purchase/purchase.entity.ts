import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "../brand/brand.entity";
import { Job } from "../job/job.entity";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Brand, brand => brand.purchases, { nullable: false })
  brand: Brand;
  
  @Column()
  brand_id: number;

  @ManyToOne(() => Job, job => job.purchases, { nullable: false })
  job: Job

  @Column({ type: "uuid" })
  job_id: string;
  
  @Column()
  model: string;

  @Column()
  quantity: number;

  @Column()
  charges: number;

  @Column()
  total: number;

  @Column()
  parts: string;

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