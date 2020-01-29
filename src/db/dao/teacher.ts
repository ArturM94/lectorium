import { DeepPartial, FindManyOptions, FindOneOptions, getRepository } from 'typeorm';

import { Teacher } from '@models/Teacher';

export class TeacherDAO {
  static findAll(options: FindManyOptions): Promise<Teacher[]> {
    return getRepository(Teacher).find(options);
  }

  static findOne(id: number | string, options?: FindOneOptions<Teacher>): Promise<Teacher | undefined> {
    return getRepository(Teacher).findOne(id, options);
  }

  static createOne(teacher: Teacher): Teacher {
    return getRepository(Teacher).create(teacher);
  }

  static merge(teacher: Teacher, entities: DeepPartial<Teacher>): Teacher {
    return getRepository(Teacher).merge(teacher, entities);
  }

  static saveOne(teacher: Teacher): Promise<Teacher> {
    return getRepository(Teacher).save(teacher);
  }

  static deleteOne(teacher: Teacher): Promise<Teacher> {
    return getRepository(Teacher).remove(teacher);
  }
}
