import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class AppConfig {
  @IsIn(['local', 'development', 'production'])
  NODE_ENV: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsIn(['Asia/Seoul'])
  TZ: string;
}

export default () => {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    TZ: process.env.TZ,
  };

  ValidateConfig(env, AppConfig);

  return {
    APP: env,
  };
};
