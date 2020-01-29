import { Request, Response } from 'express';
import { FindManyOptions, FindOneOptions } from 'typeorm';

import { Student } from '@models/Student';
import { StudentDAO } from '@db/dao/student';

export class StudentController {
  // @ts-ignore
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const options: FindManyOptions = {
        relations: ['group', 'group.lessons', 'group.lessons.teacher']
      };

      const allStudents: Student[] = await StudentDAO.findAll(options);

      if (allStudents.length === 0) {
        return res.sendStatus(404);
      }

      return res.status(200).json(allStudents);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const options: FindOneOptions = {
        relations: ['group', 'group.lessons', 'group.lessons.teacher']
      };

      const student: Student | undefined = await StudentDAO.findOne(id, options);

      if (student === undefined) {
        return res.sendStatus(404);
      }

      return res.status(200).json(student);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async post(req: Request, res: Response): Promise<Response> {
    try {
      const student: Student = req.body;

      const studentToSave: Student = await StudentDAO.createOne(student);
      const savedStudent: Student = await StudentDAO.saveOne(studentToSave);

      return res.status(200).json(savedStudent);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async putById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const student: Student = req.body;
      const options: FindOneOptions = {
        relations: ['group', 'group.lessons', 'group.lessons.teacher']
      };

      const studentToUpdate: Student | undefined = await StudentDAO.findOne(id, options);

      if (studentToUpdate === undefined) {
        return res.sendStatus(404);
      }

      StudentDAO.merge(studentToUpdate, student);
      const updatedStudent: Student = await StudentDAO.saveOne(studentToUpdate);

      return res.status(200).json(updatedStudent);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }

  async deleteById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const options: FindOneOptions = {
        relations: ['group', 'group.lessons', 'group.lessons.teacher']
      };

      const studentToDelete: Student | undefined = await StudentDAO.findOne(id, options);

      if (studentToDelete === undefined) {
        return res.sendStatus(404);
      }

      const deletedStudent: Student = await StudentDAO.deleteOne(studentToDelete);

      return res.status(200).json(deletedStudent);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
}
