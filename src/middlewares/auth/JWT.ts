import { Request } from 'express';
import jwt from 'express-jwt';

import { authConfig } from '@config/auth';

// @ts-ignore
const fromHeaderOrQuerystring  = (req: Request): string | null => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

export default jwt({
  secret: authConfig.JWT_SECRET,
  userProperty: 'token', // access by req.token
  getToken: fromHeaderOrQuerystring ,
});
