import { ConnectionOptions } from 'typeorm';

const connectionOptions = (migrationsDir: string, name?: string): ConnectionOptions => ({
  name,
  type: 'postgres',
  host: 'localhost',
  port: 7432,
  entities: ['**/*.entity.js'],
  subscribers: ['**/*.entity.js'],
  migrationsTableName: 'schema_migrations',
  migrations: [`dist/${migrationsDir}/*.js`],
  migrationsRun: process.env.NODE_ENV == 'production',
  cli: {
    migrationsDir: migrationsDir,
  },
  uuidExtension: 'uuid-ossp',
  logging: ['schema', 'query'],
  synchronize: false,
});

export const ormConfig = connectionOptions('migrations');

export default [
  ormConfig,
  connectionOptions('seeds', 'seed'),
];
