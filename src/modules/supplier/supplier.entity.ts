import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Company } from "../company/company.entity";
import { Purchase } from "../purchase/purchase.entity";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Company, company => company.suppliers, { nullable: false })
  company: Company

  @OneToMany(() => Purchase, purchase => purchase.supplier)
  purchases: Purchase[]

  @Column()
  name: string;

  @Column()
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