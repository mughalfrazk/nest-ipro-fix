import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "../company/company.entity";
import { ExpenseType } from "../expense-type/expense-type.entity";
import { Users } from "../users/users.entity";
import { Purchase } from "../purchase/purchase.entity";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Company, company => company.expenses, { nullable: false })
  company: Company

  @ManyToOne(() => ExpenseType, expense_type => expense_type.expenses, { nullable: false })
  expense_type: ExpenseType

  @ManyToOne(() => Users, user => user.expenses)
  created_by: Users

  @OneToOne(() => Purchase, job => job.expense, { nullable: true })
  purchase: Purchase

  @Column({ nullable: true })
  comments: string;

  @Column()
  amount: number

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