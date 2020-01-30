import 'dotenv/config';
import express, { ErrorRequestHandler, RequestHandler } from 'express';

import { ApiRouter } from '@routes/api';
import { AuthRouter } from '@routes/auth';
import { appConfig } from '@config/app';
import { initiateDbConnection } from '@db/connection';
import JWT from '@middlewares/auth/JWT';
import { AttachCurrentUser } from '@middlewares/auth/AttachCurrentUser';
import { Forbidden, InternalServer, Unauthorized } from '@middlewares/ErrorHandlers';

const { PORT } = appConfig;
const app = express();

const authMiddlewares: RequestHandler[] = [JWT, AttachCurrentUser];
const errorMiddlewares: ErrorRequestHandler[] = [
  Unauthorized,
  Forbidden,
  InternalServer
];

initiateDbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', AuthRouter);
app.use('/api', authMiddlewares, ApiRouter);
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

export default app;
