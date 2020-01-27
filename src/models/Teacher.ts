import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';
import { Lesson } from '@models/Lesson';

@Entity()
export class Teacher {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 15, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'varchar', length: 15, name: 'last_name' })
  lastName!: string;

  @OneToMany(() => Lesson, lesson => lesson.teacher)
  @JoinColumn({ name: 'lesson_ids' })
  lessons!: Lesson[];

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
