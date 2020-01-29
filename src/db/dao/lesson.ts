import { DeepPartial, FindManyOptions, FindOneOptions, getRepository } from 'typeorm';

import { Lesson } from '@models/Lesson';

export class LessonDAO {
  static findAll(options: FindManyOptions): Promise<Lesson[]> {
    return getRepository(Lesson).find(options);
  }

  static findOne(id: number | string, options?: FindOneOptions<Lesson>): Promise<Lesson | undefined> {
    return getRepository(Lesson).findOne(id, options);
  }

  static createOne(lesson: Lesson): Lesson {
    return getRepository(Lesson).create(lesson);
  }

  static merge(lesson: Lesson, entities: DeepPartial<Lesson>): Lesson {
    return getRepository(Lesson).merge(lesson, entities);
  }

  static saveOne(lesson: Lesson): Promise<Lesson> {
    return getRepository(Lesson).save(lesson);
  }

  static deleteOne(lesson: Lesson): Promise<Lesson> {
    return getRepository(Lesson).remove(lesson);
  }
}
