import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Issue } from "../issue/issue.entity";
import { Purchase } from "../purchase/purchase.entity";
import { Company } from "../company/company.entity";
import { InvoiceItem } from "../invoice-item/invoice-item.entity";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, company => company.brands)
  company: Company

  @OneToMany(() => Issue, issue => issue.brand)
  issues: Issue[]

  @OneToMany(() => InvoiceItem, invoice_item => invoice_item.brand)
  invoice_items: InvoiceItem[]

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