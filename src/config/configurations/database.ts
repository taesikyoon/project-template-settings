import { IsIn, IsNumber, IsString } from 'class-validator';
import ValidateConfig from '@config/validator.config';

export class DataBaseConfig {
  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_USER: string;

  @IsString()
  DATABASE_PASS: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_DB: string;

  @IsIn(['mysql', 'mariadb'])
  DATABASE_TYPE: string;
}

export default () => {
  const env = {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_DB: process.env.DATABASE_DB,
    DATABASE_TYPE: process.env.DATABASE_TYPE,
  };

  ValidateConfig(env, DataBaseConfig);

  return {
    DATABASE: env,
  };
};
