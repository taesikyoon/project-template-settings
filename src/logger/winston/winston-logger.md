# **Winston Logger**

1. 로깅을 위한 Winston 라이브러리를 사용합니다.
   - https://github.com/winstonjs/winston
1. 로그 파일을 남기기 위해서 winston-daily-rotate-file 라이브러리를 사용합니다.
1. NestJS Interceptor를 이용하여 로그를 기록합니다.
   - https://docs.nestjs.com/interceptors

## **설치**

먼저 프로젝트에 Winston 및 관련 모듈을 설치합니다.

```bash
npm install winston winston-daily-rotate-file
```

## **테스트 실행**

```
 npm run test src/logger/winston/winston.provider.spec.ts
```

## **WinstonLogger 클래스**

**`WinstonLogger`** 클래스는 Winston 로거를 래핑하고 싱글톤 패턴을 사용하여 인스턴스를 관리합니다.'

- **`log(message: string, context?: any)`**: 정보 로그를 기록합니다.
- **`error(message: string, context?: any, stack?: any)`**: 에러 로그를 기록합니다.
- **`warn(message: string, context?: any)`**: 경고 로그를 기록합니다.
- **`debug(message: string, context?: any)`**: 디버그 로그를 기록합니다.
- **`verbose(message: string, context?: any)`**: 상세 로그를 기록합니다.

예제:

```tsx
import { Logger } from '@logger-winston/winston.provider';

Logger.log('이것은 정보 로그입니다.');
Logger.error('이것은 에러 로그입니다.', { additionalInfo: '에러 상세 정보' });
Logger.warn('이것은 경고 로그입니다.');
Logger.debug('이것은 디버그 로그입니다.');
Logger.verbose('이것은 상세 로그입니다.');
```

## **LoggingInterceptor**

**`LoggingInterceptor`**  
NestJS에서 요청과 응답에 로그를 찍기 위해서 middleware보다 interceptor를 사용했습니다.

## **Logger 설정**

Winston 로거의 설정은 다음과 같이 구성됩니다:

```tsx
typescriptCopy code
import { transports, createLogger, format } from 'winston';
import 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const dailyRotateFileInfo = new transports.DailyRotateFile({
  level: 'info', // info 레벨 로그를 저장할 파일 설정
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  filename: `%DATE%.log`, // %DATE% = 위에서 설정한 datePattern 이 들어감
  dirname: './logs',
  maxFiles: 30, // 30일치 로그 파일 저장
});
const dailyRotateFileError = new transports.DailyRotateFile({
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  filename: `%DATE%.error.log`,
  dirname: './logs',
  maxFiles: 30,
});

export const LoggerOptions = createLogger({
  level: 'error',
  levels,
  format: format.combine(format.prettyPrint()),
  transports: [dailyRotateFileInfo, dailyRotateFileError],
});

```

위 설정은 로깅 수준, 로그 파일 저장 위치, 파일명 패턴 등을 설정합니다.
