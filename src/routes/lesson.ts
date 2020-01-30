import express, { Router } from 'express';

import { LessonController } from '@controllers/lesson';

export const LessonRouter: Router = express.Router();
const lessonController: LessonController = new LessonController();

LessonRouter.get('/', lessonController.getAll);
LessonRouter.get('/:id', lessonController.getById);
LessonRouter.post('/', lessonController.post);
LessonRouter.put('/:id', lessonController.putById);
LessonRouter.delete('/:id', lessonController.deleteById);
