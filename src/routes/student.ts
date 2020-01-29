import express, { Router } from 'express';

import { StudentController } from '@controllers/student';

export const StudentRouter: Router = express.Router();
const studentController: StudentController = new StudentController();

StudentRouter.get('/', studentController.getAll);

StudentRouter.get('/:id', studentController.getById);

StudentRouter.post('/', studentController.post);

StudentRouter.put('/:id', studentController.putById);

StudentRouter.delete('/:id', studentController.deleteById);
