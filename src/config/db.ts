import { ConnectionOptions } from 'typeorm';

export const dbConnectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'lectorium',
  synchronize: true,
  logging: false,
  entities: [
    'src/models/**/*.ts'
  ],
  migrations: [
    'src/db/migrations/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/db/migrations'
  }
};
