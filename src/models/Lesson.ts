import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';
import { Teacher } from '@models/Teacher';
import { Group } from '@models/Group';

@Entity()
export class Lesson {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'smallint', name: 'schedule_index' })
  scheduleIndex!: number;

  @Column({ type: 'smallint' })
  classroom!: number;

  @Column({ type: 'varchar', length: 100 })
  topic!: string;

  @ManyToOne(() => Teacher, teacher => teacher.lessons)
  @JoinColumn({ name: 'teacher_id' })
  teacher!: Teacher;

  @ManyToOne(() => Group, group => group.lessons)
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
