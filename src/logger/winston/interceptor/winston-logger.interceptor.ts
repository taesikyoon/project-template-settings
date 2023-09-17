import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '../provider/winston.provider';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = await context.switchToHttp().getRequest();
    const response = await context.switchToHttp().getResponse();

    const { method, url, ip, headers, body } = request;
    const userAgent = headers['user-agent'] || '';

    const now = Date.now();
    let timestamp = Date().toString();

    Logger.log(`Request : ${method} ${url}`, { timestamp, userAgent, ip, inputDate: body });

    return next.handle().pipe(
      tap(data => {
        const responseTime = `${Date.now() - now}ms`;
        timestamp = Date().toString();
        Logger.log(`Response : ${method} ${url}`, {
          statusCode: response.statusCode,
          timestamp,
          userAgent,
          ip,
          responseTime,
          outputDate: data,
        });
      }),
    );
  }
}
