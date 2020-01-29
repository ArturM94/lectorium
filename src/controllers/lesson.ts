import { Request, Response } from 'express';
import { FindManyOptions, FindOneOptions } from 'typeorm';

import { Lesson } from '@models/Lesson';
import { LessonDAO } from '@db/dao/lesson';

export class LessonController {
  // @ts-ignore
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const options: FindManyOptions = {
        relations: ['group', 'group.students', 'teacher']
      };

      const allLessons: Lesson[] = await LessonDAO.findAll(options);

      if (allLessons.length === 0) {
        return res.sendStatus(404);
      }

      return res.status(200).json(allLessons);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const options: FindOneOptions = {
        relations: ['group', 'group.students', 'teacher']
      };

      const lesson: Lesson | undefined = await LessonDAO.findOne(id, options);

      if (lesson === undefined) {
        return res.sendStatus(404);
      }

      return res.status(200).json(lesson);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    try {
      const lesson: Lesson = req.body;

      const lessonToSave: Lesson = await LessonDAO.createOne(lesson);
      const savedLesson: Lesson = await LessonDAO.saveOne(lessonToSave);

      return res.status(200).json(savedLesson);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async putById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const lesson: Lesson = req.body;
      const options: FindOneOptions = {
        relations: ['group', 'group.students', 'teacher']
      };

      const lessonToUpdate: Lesson | undefined = await LessonDAO.findOne(id, options);

      if (lessonToUpdate === undefined) {
        return res.sendStatus(404);
      }

      LessonDAO.merge(lessonToUpdate, lesson);
      const updatedLesson: Lesson = await LessonDAO.saveOne(lessonToUpdate);

      return res.status(200).json(updatedLesson);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const options: FindOneOptions = {
        relations: ['group', 'group.students', 'teacher']
      };

      const lessonToDelete: Lesson | undefined = await LessonDAO.findOne(id, options);

      if (lessonToDelete === undefined) {
        return res.sendStatus(404);
      }

      const deletedLesson: Lesson = await LessonDAO.deleteOne(lessonToDelete);

      return res.status(200).json(deletedLesson);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
}
