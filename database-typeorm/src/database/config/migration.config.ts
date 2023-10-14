import { DataSource } from 'typeorm';
import { ormConfig, PROJECT_SRC_ROOT } from './orm.config';

const migrationDataSource = new DataSource({
  ...ormConfig,
  migrationsTableName: 'migrations',
  migrations: [`${PROJECT_SRC_ROOT}/database/migrations/*.ts`],
});

export default migrationDataSource;
