import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InvoiceStatus } from "../invoice-status/invoice-status.entity";
import { Customer } from "../customer/customer.entity";
import { Company } from "../company/company.entity";
import { Users } from "../users/users.entity";
import { Job } from "../job/job.entity";
import { InvoiceItem } from "../invoice-item/invoice-item.entity";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Company, company => company.invoices)
  company: Company

  @ManyToOne(() => InvoiceStatus, invoice_status => invoice_status.invoices)
  invoice_status: InvoiceStatus

  @ManyToOne(() => Users, user => user.invoices)
  created_by: Users

  @ManyToOne(() => Customer, customer => customer.invoices)
  customer: Customer

  @ManyToOne(() => Users, user => user.invoices)
  technician: Users

  @OneToMany(() => InvoiceItem, invoice_item => invoice_item.invoice, { cascade: ["insert"] })
  invoice_items: InvoiceItem[]

  @OneToOne(() => Job, job => job.invoice)
  @JoinColumn({ name: "id" })
  job: Job

  @Column()
  issue_total: number;

  @Column()
  purchase_total: number;

  @Column()
  total: number

  @Column({ nullable: true })
  barcode: string;

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