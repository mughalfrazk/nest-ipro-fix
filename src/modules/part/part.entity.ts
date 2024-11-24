import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Issue } from "../issue/issue.entity";
import { Purchase } from "../purchase/purchase.entity";
import { Company } from "../company/company.entity";

@Entity()
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, company => company.parts)
  company: Company

  @OneToMany(() => Purchase, purchase => purchase.part)
  purchases: Purchase[]

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

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