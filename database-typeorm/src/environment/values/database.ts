import { IsString, IsIn, IsNumber } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class DatabaseConfig {
  @IsString()
  DATABASE_DB: string;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_PASS: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsIn(['mysql', 'mariadb'])
  DATABASE_TYPE: 'mysql' | 'mariadb';

  @IsString()
  DATABASE_USER: string;
}
export default () => {
  const isProduction = process.env.NODE_ENV === 'production' ? false : true;

  const env = {
    DATABASE_DB: process.env.DATABASE_DB,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_USER: process.env.DATABASE_USER,
    LOGGING: isProduction,
    SYNCHRONIZE: isProduction,
  };

  ValidateConfig(env, DatabaseConfig);

  return {
    DATABASE: env,
  };
};
