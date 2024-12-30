import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Company } from "../company/company.entity";
import { Expense } from "../expense/expense.entity";

@Entity()
export class ExpenseType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, company => company.brands)
  company: Company

  @OneToMany(() => Expense, expense => expense.expense_type)
  expenses: Expense[]

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  is_purchase: boolean;

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