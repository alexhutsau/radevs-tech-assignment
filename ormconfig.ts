import { ConnectionOptions } from 'typeorm';

const migrationsDir = 'migrations'

export default {
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
} as ConnectionOptions;
