import { DeepPartial, FindManyOptions, FindOneOptions, getRepository } from 'typeorm';

import { Student } from '@models/Student';

export class StudentDAO {
  static findAll(options: FindManyOptions): Promise<Student[]> {
    return getRepository(Student).find(options);
  }

  static findOne(id: number | string, options?: FindOneOptions<Student>): Promise<Student | undefined> {
    return getRepository(Student).findOne(id, options);
  }

  static createOne(student: Student): Student {
    return getRepository(Student).create(student);
  }

  static merge(student: Student, entities: DeepPartial<Student>): Student {
    return getRepository(Student).merge(student, entities);
  }

  static saveOne(student: Student): Promise<Student> {
    return getRepository(Student).save(student);
  }

  static deleteOne(student: Student): Promise<Student> {
    return getRepository(Student).remove(student);
  }
}
