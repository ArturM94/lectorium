import express, { Router } from 'express';

import { GroupController } from '@controllers/group';

export const GroupRouter: Router = express.Router();
const groupController: GroupController = new GroupController();

GroupRouter.get('/', groupController.getAll);
GroupRouter.get('/:id', groupController.getById);
GroupRouter.post('/', groupController.post);
GroupRouter.put('/:id', groupController.putById);
GroupRouter.delete('/:id', groupController.deleteById);
