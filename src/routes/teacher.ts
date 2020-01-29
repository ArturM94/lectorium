import express, { Router } from 'express';

import { TeacherController } from '@controllers/teacher';

export const TeacherRouter: Router = express.Router();
const teacherController: TeacherController = new TeacherController();

TeacherRouter.get('/', teacherController.getAll);

TeacherRouter.get('/:id', teacherController.getById);

TeacherRouter.post('/', teacherController.post);

TeacherRouter.put('/:id', teacherController.putById);

TeacherRouter.delete('/:id', teacherController.deleteById);
