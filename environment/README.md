# 환경변수 템플릿

환경변수 관리 모듈을 만들었습니다.
환경변수 모듈에서는 각 입력되는 환경변수 유효성 검사를 진행합니다.

**환경변수 템플릿의 목적**
각 환경에 맞는(local, dev, prod)에 맞는 실행과 개발자의 실수를 예방하는 환경변수 유효성 검사

### 설치 패키지

```
npm i --save @nestjs/config class-validator class-transformer
```

### 참고 레퍼런스

- https://docs.nestjs.com/techniques/configuration
- https://docs.nestjs.com/techniques/validation

### 사용 방법

- 실행 스크립트와 환경변수 파일

```
# package.json script
# 각 환경에 맞는 실행 스크립트 사용
"start": "NODE_ENV=local nest start --watch",
"start:dev": "NODE_ENV=development node dist/main",
"start:prod": "NODE_ENV=production node dist/main",


# env file
# 각 환경에 맞는 환경변수 파일이 존재해야합니다.
start = .local.env
start:dev = .development.env
start:prod = .production.env

```

- 환경변수 모듈

```
# environment.module.ts
import appConfig from './values/app';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`, // 실행 스크립트에서 사용되는 NODE_ENV로 환경에 맞는 파일 지정
      load: [appConfig], // 각 환경변수를 사용하기위해 로드
    }),
  ],
  controllers: [],
  providers: [],
})
export class EnvironmentModule {}

```

- 환경변수 유효성 검사

```
# environment.validator.ts

import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';

function ValidateConfig<T extends object>(
  config: Record<string, unknown>,
  envClass: ClassConstructor<T>,
) {
  const validatedConfig = plainToClass(envClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
}

export default ValidateConfig;

```

- 각 환경변수 관리 파일

```
# values/app.ts
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

```
