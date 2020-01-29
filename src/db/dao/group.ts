import { DeepPartial, FindManyOptions, FindOneOptions, getRepository } from 'typeorm';

import { Group } from '@models/Group';

export class GroupDAO {
  static findAll(options: FindManyOptions): Promise<Group[]> {
    return getRepository(Group).find(options);
  }

  static findOne(id: number | string, options?: FindOneOptions<Group>): Promise<Group | undefined> {
    return getRepository(Group).findOne(id, options);
  }

  static createOne(group: Group): Group {
    return getRepository(Group).create(group);
  }

  static merge(group: Group, entities: DeepPartial<Group>): Group {
    return getRepository(Group).merge(group, entities);
  }

  static saveOne(group: Group): Promise<Group> {
    return getRepository(Group).save(group);
  }

  static deleteOne(group: Group): Promise<Group> {
    return getRepository(Group).remove(group);
  }
}
