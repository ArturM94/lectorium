import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { dbConnectionConfig } from '@config/db';

export const initiateDbConnection = (): void => {
  createConnection(dbConnectionConfig);
};
