import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Issue } from "../issue/issue.entity";
import { Purchase } from "../purchase/purchase.entity";
import { Company } from "../company/company.entity";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, company => company.brands)
  company: Company

  @OneToMany(() => Issue, issue => issue.brand)
  issues: Issue[]

  // @OneToMany(() => Purchase, purchase => purchase.brand)
  // purchases: Purchase[]

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