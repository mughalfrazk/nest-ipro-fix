import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Invoice } from "../invoice/invoice.entity";

@Entity()
export class InvoiceStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Invoice, invoice => invoice.invoice_status)
  invoices: Invoice[]

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