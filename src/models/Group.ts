import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';
import { Student } from '@models/Student';
import { Lesson } from '@models/Lesson';

@Entity()
export class Group {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  name!: string;

  @OneToMany(() => Lesson, lesson => lesson.group)
  @JoinColumn({ name: 'lesson_ids' })
  lessons!: Lesson[];

  @OneToMany(() => Student, student => student.group)
  @JoinColumn({ name: 'student_ids' })
  students!: Student[];

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
