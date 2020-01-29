import express, { Router } from 'express';

import { GroupRouter } from '@routes/group';
import { LessonRouter } from '@routes/lesson';
import { StudentRouter } from '@routes/student';
import { TeacherRouter } from '@routes/teacher';

export const ApiRouter: Router = express.Router();

ApiRouter.use('/groups', GroupRouter);
ApiRouter.use('/lessons', LessonRouter);
ApiRouter.use('/students', StudentRouter);
ApiRouter.use('/teachers', TeacherRouter);
