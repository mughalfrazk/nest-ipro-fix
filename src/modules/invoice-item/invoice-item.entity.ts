import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Invoice } from "../invoice/invoice.entity";
import { Brand } from "../brand/brand.entity";
import { Model } from "../model/model.entity";
import { Problem } from "../problem/problem.entity";
import { Part } from "../part/part.entity";

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Invoice, invoice => invoice.invoice_items)
  invoice: Invoice

  @Column({ nullable: false })
  item_type: string;

  @Column({ nullable: true })
  brand_name: string

  @ManyToOne(() => Brand, brand => brand.invoice_items, { nullable: true })
  brand: Brand

  @Column({ nullable: true })
  brand_id: number

  @Column({ nullable: true })
  issue_model_name: string

  @ManyToOne(() => Model, model => model.invoice_items_issue, { nullable: true })
  issue_model: Model

  @Column({ nullable: true })
  issue_model_id: number

  @Column({ nullable: true })
  purchase_model_name: string

  @ManyToOne(() => Model, model => model.invoice_items_purchase, { nullable: true })
  purchase_model: Model

  @Column({ nullable: true })
  purchase_model_id: number

  @Column({ nullable: true })
  problem_name: string

  @ManyToOne(() => Problem, model => model.invoice_items, { nullable: true })
  problem: Problem

  @Column({ nullable: true })
  problem_id: number

  @Column({ nullable: true })
  part_name: string

  @ManyToOne(() => Part, model => model.invoice_items, { nullable: true })
  part: Part
  
  @Column({ nullable: true })
  part_id: number

  @Column({ nullable: true })
  charges: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  total: number

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