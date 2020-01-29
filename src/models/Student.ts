import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';
import { Group } from '@models/Group';

@Entity()
export class Student {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 15, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'varchar', length: 15, name: 'last_name' })
  lastName!: string;

  @Column({ type: 'smallint', default: 0 })
  rating!: number;

  @ManyToOne(() => Group, group => group.students, {
    cascade: true
  })
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
