require('dotenv/config');

const dir = process.env.NODE_ENV === 'test' || process.env.TS_NODE_DEV ? 'src' : 'dist';
const file = process.env.NODE_ENV === 'test' || process.env.TS_NODE_DEV ? 'ts' : 'js';
const database =
  process.env.NODE_ENV === 'test' ? 'tests' : undefined;
const port = process.env.NODE_ENV === 'test' ? 5432 : undefined;
const host = process.env.NODE_ENV === 'test' ? 'database_test' : undefined;

const config = {
  type: 'postgres',
  host: host || process.env.POSTGRESQL_HOST,
  port: port || Number(process.env.POSTGRESQL_PORT),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: database || process.env.POSTGRESQL_DB,
  entities: [`./${dir}/modules/**/infra/typeorm/entities/*.${file}`],
  migrations: [`./${dir}/shared/infra/typeorm/migrations/*.${file}`],
  cli: {
    migrationsDir: `./${dir}/shared/infra/typeorm/migrations/`,
  },
};


module.exports = config;