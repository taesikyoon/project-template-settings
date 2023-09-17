import { transports, createLogger, format } from 'winston';
import 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4,
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
