import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

// @ts-ignore
export const Unauthorized = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): Response | void => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  }
  next();
};

// @ts-ignore
export const Forbidden = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): Response | void => {
  if (err.name === 'ForbiddenError') {
    res.status(403).send('Restricted');
  }
  next();
};

// @ts-ignore
export const InternalServer = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): Response | void => {
  if (err.name === 'InternalServerError') {
    res.status(500).send('Something went wrong...');
  }
  next();
};
