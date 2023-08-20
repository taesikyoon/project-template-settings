import { BaseException } from '@common/exceptions/base.exception';
import { UnexpectedException } from '@common/exceptions/customs/unexpected.exception';
import { Catch, ArgumentsHost } from '@nestjs/common';

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

    response.status(res.statusCode).json({
      errorCode: res.errorCode,
      statusCode: res.statusCode,
      timestamp: res.timestamp,
      path: res.path,
      message: res.message,
    });
  }
}
