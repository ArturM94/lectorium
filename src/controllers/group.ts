import { Request, Response } from 'express';
import { FindManyOptions, FindOneOptions } from 'typeorm';

import { Group } from '@models/Group';
import { GroupDAO } from '@db/dao/group';

export class GroupController {
  // @ts-ignore
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const options: FindManyOptions = {
        relations: ['lessons', 'lessons.teacher', 'students']
      };

      const allGroups: Group[] = await GroupDAO.findAll(options);

      if (allGroups.length === 0) {
        return res.sendStatus(404);
      }

      return res.status(200).json(allGroups);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const options: FindOneOptions = {
        relations: ['lessons', 'lessons.teacher', 'students']
      };

      const group: Group | undefined = await GroupDAO.findOne(id, options);

      if (group === undefined) {
        return res.sendStatus(404);
      }

      return res.status(200).json(group);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    try {
      const group: Group = req.body;

      const groupToSave: Group = await GroupDAO.createOne(group);
      const savedGroup: Group = await GroupDAO.saveOne(groupToSave);

      return res.status(200).json(savedGroup);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async putById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const group: Group = req.body;
      const options: FindOneOptions = {
        relations: ['lessons', 'lessons.teacher', 'students']
      };

      const groupToUpdate: Group | undefined = await GroupDAO.findOne(id, options);

      if (groupToUpdate === undefined) {
        return res.sendStatus(404);
      }

      GroupDAO.merge(groupToUpdate, group);
      const updatedGroup: Group = await GroupDAO.saveOne(groupToUpdate);

      return res.status(200).json(updatedGroup);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const options: FindOneOptions = {
        relations: ['lessons', 'lessons.teacher', 'students']
      };

      const groupToDelete: Group | undefined = await GroupDAO.findOne(id, options);

      if (groupToDelete === undefined) {
        return res.sendStatus(404);
      }

      const deletedGroup: Group = await GroupDAO.deleteOne(groupToDelete);

      return res.status(200).json(deletedGroup);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
}
