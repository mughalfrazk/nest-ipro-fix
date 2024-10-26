import { CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../users/users.entity";

@Entity()
export class TechinicianInfo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // @OneToOne(() => Users, user => user.technician_info)
  // user: Users;

  // @ManyToOne(() => ProblemType, speciality => speciality.users, { nullable: true })
  // speciality: ProblemType

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