import { ApiHideProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../role/role.entity";
import { Company } from "../company/company.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Role, role => role.users, { nullable: false })
  role: Role

  @ManyToOne(() => Company, company => company.users, { nullable: false })
  company: Company

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column()
  email: string;

  @ApiHideProperty()
  @Column({ select: false })
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: false })
  is_verified: boolean;

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