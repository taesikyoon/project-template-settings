import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import ValidateConfig from '@config/validator.config';

export class AppConfig {
  @IsIn(['local', 'development', 'production'])
  NODE_ENV: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsString()
  APP_NAME: string;

  @IsString()
  API_PREFIX: string;

  @IsIn(['Asia/Seoul'])
  TZ: string;
}

export default () => {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT || 5010,
    APP_NAME: process.env.APP_NAME,
    API_PREFIX: process.env.API_PREFIX,
    TZ: process.env.TZ,
  };

  ValidateConfig(env, AppConfig);

  return {
    APP: env,
  };
};
