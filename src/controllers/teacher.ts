import { Request, Response } from 'express';
import { FindManyOptions, FindOneOptions } from 'typeorm';

import { Teacher } from '@models/Teacher';
import { TeacherDAO } from '@db/dao/teacher';

export class TeacherController {
  // @ts-ignore
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const options: FindManyOptions = {
        relations: ['lessons', 'lessons.group', 'lessons.group.students']
      };

      const allTeachers: Teacher[] = await TeacherDAO.findAll(options);

      if (allTeachers.length === 0) {
        return res.sendStatus(404);
      }

      return res.status(200).json(allTeachers);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const options: FindOneOptions = {
        relations: ['lessons', 'lessons.group', 'lessons.group.students']
      };

      const teacher: Teacher | undefined = await TeacherDAO.findOne(id, options);

      if (teacher === undefined) {
        return res.sendStatus(404);
      }

      return res.status(200).json(teacher);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    try {
      const teacher: Teacher = req.body;

      const teacherToSave: Teacher = await TeacherDAO.createOne(teacher);
      const savedTeacher: Teacher = await TeacherDAO.saveOne(teacherToSave);

      return res.status(200).json(savedTeacher);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async putById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const teacher: Teacher = req.body;
      const options: FindOneOptions = {
        relations: ['lessons', 'lessons.group', 'lessons.group.students']
      };

      const teacherToUpdate: Teacher | undefined = await TeacherDAO.findOne(id, options);

      if (teacherToUpdate === undefined) {
        return res.sendStatus(404);
      }

      TeacherDAO.merge(teacherToUpdate, teacher);
      const updatedTeacher: Teacher = await TeacherDAO.saveOne(teacherToUpdate);

      return res.status(200).json(updatedTeacher);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const options: FindOneOptions = {
        relations: ['lessons', 'lessons.group', 'lessons.group.students']
      };

      const teacherToDelete: Teacher | undefined = await TeacherDAO.findOne(id, options);

      if (teacherToDelete === undefined) {
        return res.sendStatus(404);
      }

      const deletedTeacher: Teacher = await TeacherDAO.deleteOne(teacherToDelete);

      return res.status(200).json(deletedTeacher);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
}
