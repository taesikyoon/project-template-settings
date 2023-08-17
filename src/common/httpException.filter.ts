import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { format } from 'date-fns';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message =
      typeof exception.getResponse === 'function'
        ? exception.getResponse()['message'] || exception.message
        : exception.message;
    const DB_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss.SSSSS';
    const now = new Date(); // 현재 시간
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000; // 9시간 밀리세컨드 값
    const koreaNow = new Date(utc + KR_TIME_DIFF);

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: format(koreaNow, DB_DATE_FORMAT),
      path: request.url,
    });
  }
}
//
