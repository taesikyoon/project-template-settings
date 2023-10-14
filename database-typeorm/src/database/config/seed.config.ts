import { DataSource } from 'typeorm';
import { ormConfig, PROJECT_SRC_ROOT } from './orm.config';

const seedDataSource = new DataSource({
  ...ormConfig,
  migrationsTableName: 'seeds',
  migrations: [`${PROJECT_SRC_ROOT}/database/seeds/*.ts`],
});

export default seedDataSource;
