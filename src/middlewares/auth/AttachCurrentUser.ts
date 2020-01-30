import { NextFunction, Request, Response } from 'express';

import { Teacher } from '@models/Teacher';
import { TeacherDAO } from '@db/dao/teacher';

export const AttachCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // @ts-ignore
    const id = req.token.data.id;
    const user: Teacher | undefined = await TeacherDAO.findOneById(id);
    if (user === undefined) {
      return res.sendStatus(401);
    }
    // @ts-ignore
    req.currentUser = user;
    return next();
  } catch (e) {
    return res.sendStatus(500);
  }
};
