import { BaseException } from '@common/exceptions/base.exception';
import { UnexpectedException } from '@common/exceptions/customs/unexpected.exception';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { Logger } from '@logger/winston/winston.provider';

interface ExceptionFilter<T = any> {
  catch(exception: T, host: ArgumentsHost): any;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const res = exception instanceof BaseException ? exception : new UnexpectedException();

    res.timestamp = new Date().toString();
    res.path = request.url;

    // 스택 추가
    Logger.error(
      res.message,
      { timestamp: res.timestamp, path: res.path, errorCode: res.errorCode, statusCode: res.statusCode },
      res.stack,
    );

    response.status(res.statusCode).json({
      errorCode: res.errorCode,
      statusCode: res.statusCode,
      timestamp: res.timestamp,
      path: res.path,
      message: res.message,
    });
  }
}
